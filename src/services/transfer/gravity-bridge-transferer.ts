import {
  BridgeFee,
  BroadcastSource,
  IToken,
  ITransfer,
  SupportedChain,
  SupportedCosmosChain,
  SupportedEthChain,
} from 'types';

import { fetchTokenPriceData } from 'services/oracle';
import Big from 'big.js';
import _ from 'lodash';
import { cosmos } from 'constants/proto';
import cosmosTxService from 'services/cosmos-tx/cosmos-tx-service';
import cosmosWalletManager from 'services/cosmos-wallet/cosmos-wallet-manager';
import ethWalletManger from 'services/eth-wallet/eth-wallet-manager';
import gravityBridgeMessageService from 'services/cosmos-tx/gravity-bridge-message-service';
import loggerFactory from 'services/util/logger-factory';
import typeHelper from 'services/util/type-helper';
import axios from 'axios';
import { log } from 'console';

const logger = loggerFactory.getLogger('[GravityBridgeTransferer]');

const contracts = {
  [SupportedEthChain.Eth]: '0xa4108aA1Ec4967F8b52220a4f7e94A8201F2D906'
};

const fromToMap: { [key in SupportedChain]?: { [key in SupportedChain]?: (transfer: ITransfer) => Promise<string> } } = {
  [SupportedChain.GravityBridge]: {
    [SupportedChain.Eth]: transferFromGravityBridge
  },
  [SupportedChain.Eth]: {
    [SupportedChain.GravityBridge]: transferToGravityBridge
  }
};

type SendToCosmosResponse = {
  transactionHash: string
};

function isGravityBridgeTransfer (from: SupportedChain, to: SupportedChain): boolean {
  const func = _.get(fromToMap, [from, to]);
  return func !== undefined;
}

async function transfer (entity: ITransfer): Promise<string> {
  logger.info('[transfer] Entity:', entity);

  const transferFunc = _.get(fromToMap, [entity.fromChain, entity.toChain]);
  if (!transferFunc) {
    const errorMessage = `Transferring from ${entity.fromChain} to ${entity.toChain} is not supported on Gravity Bridge!`;
    logger.error('[transfer]', errorMessage);
    throw new Error(errorMessage);
  }

  return transferFunc(entity);
}

async function transferToGravityBridge (entity: ITransfer): Promise<string> {
  logger.info('[transferToGravityBridge] Entity:', entity);

  if (entity.token.erc20 === undefined) {
    const errorMessage = 'Gravity Transferer only allow ERC20 token!';
    logger.error('[transferToGravityBridge]', errorMessage);
    throw new Error(errorMessage);
  }

  if (typeHelper.isSupportedEthChain(entity.fromChain)) {
    const web3 = await ethWalletManger.getWeb3(entity.fromChain);
    if (web3 === null) {
      const errorMessage = "Can't get web3 from current wallet!";
      logger.error('[transferToGravityBridge]', errorMessage);
      throw new Error(errorMessage);
    }

    const erc20Token = entity.token.erc20;
    const decimal = new Big(10).pow(erc20Token.decimals);
    const _amount = new Big(entity.amount).times(decimal).toString();

    const contractAddress = contracts[entity.fromChain];
    await web3.approve(entity.fromAddress, erc20Token.address, contractAddress, _amount);
    const response = await web3.sendToCosmos(contractAddress, entity.fromAddress, erc20Token.address, entity.toAddress, _amount);
    if (!isSendCosmosResponse(response)) {
      throw new Error('No TX hash');
    }

    logger.info('[transferToGravityBridge] Sending succeed!', 'TX hash:', response.transactionHash);
    return response.transactionHash;
  } else {
    const errorMessage = `Transferring from ${entity.fromChain} is not supported on Gravity Bridge`;
    logger.error('[transferToGravityBridge]', errorMessage);
    throw new Error(errorMessage);
  }
}

async function transferFromGravityBridge (transfer: ITransfer): Promise<string> {
  logger.info('[transferFromGravityBridge] Transfer Entity:', transfer);
  if (!typeHelper.isSupportedCosmosChain(transfer.fromChain)) {
    throw new Error('from chain is not supported Cosmos chain!');
  }

  const directAvailable = await cosmosWalletManager.canSignDirect(transfer.fromChain);
  const aminoAvailable = await cosmosWalletManager.canSignAmino(transfer.fromChain);

  if (directAvailable) {
    return broadcastWithDirectSign(transfer);
  } else if (aminoAvailable) {
    return broadcastWithAminoSign(transfer);
  } else {
    throw new Error('[transferFromGravityBridge] Wallet should support direct signing or amino signing!');
  }
}

async function broadcastWithDirectSign (transfer: ITransfer): Promise<string> {
  const feeAmount = transfer.feeAmount || '0';
  const memo = transfer.memo || '';
  const gasLimit = 200000;

  const message = gravityBridgeMessageService.createSendToEthereumMessage(transfer);
  const signature = await cosmosWalletManager.signDirect(
    SupportedCosmosChain.GravityBridge,
    [message],
    feeAmount,
    gasLimit,
    memo
  );
  const txBytes = cosmosTxService.createTxRawBytes(signature);
  return cosmosWalletManager.broadcast(
    SupportedCosmosChain.GravityBridge,
    txBytes,
    cosmos.tx.v1beta1.BroadcastMode.BROADCAST_MODE_SYNC,
    BroadcastSource.Lcd
  );
}

async function broadcastWithAminoSign (transfer: ITransfer): Promise<string> {
  if (!typeHelper.isSupportedCosmosChain(transfer.fromChain)) {
    throw new Error('from chain is not supported Cosmos chain!');
  }
  const feeAmount = transfer.feeAmount || '0';
  const memo = transfer.memo || '';
  const gasLimit = 200000;

  const aminoMessage = gravityBridgeMessageService.createSendToEthereumAminoMessage(transfer);
  const protoMessage = gravityBridgeMessageService.createSendToEthereumMessage(transfer);

  const aminoSignResponse = await cosmosWalletManager.signAmino(
    transfer.fromChain,
    [aminoMessage],
    feeAmount,
    gasLimit,
    memo
  );

  const txBytes = cosmosTxService.createAminoTxRawBytes(aminoSignResponse, [protoMessage]);
  return cosmosWalletManager.broadcast(
    transfer.fromChain,
    txBytes,
    cosmos.tx.v1beta1.BroadcastMode.BROADCAST_MODE_SYNC,
    BroadcastSource.Wallet
  );
}

function isSendCosmosResponse (response: unknown): response is SendToCosmosResponse {
  return (response as SendToCosmosResponse).transactionHash !== undefined;
}

async function getGasPrices (): Promise<{ slow: number; fast: number; instant: number }> {
  try {
    const baseUrl = 'https://api.chandrastation.com';
    const response = await axios.get(`${baseUrl}/api/gas-prices`);
    const { slow, fast, instant } = response.data;
    return {
      slow,
      fast,
      instant
    };
  } catch (error) {
    throw new Error('Error fetching gas prices');
  }
}

async function getWETHPrice (): Promise<{ price: number }> {
  try {
    const response = await axios.get('https://info.gravitychain.io:9000/erc20_metadata');
    const data = response.data;

    const tokenData = data.find((item: any) => item.symbol === 'WETH');

    if (!tokenData) {
      throw new Error('WETH not found in the response');
    }

    return {
      price: tokenData.exchange_rate / 1e6 // Convert to USD
    };
  } catch (error) {
    throw new Error('Error fetching WETH price:');
  }
}

async function getFees (fromChain: SupportedChain, token: IToken): Promise<BridgeFee[]> {
  if (fromChain === SupportedChain.GravityBridge) {
    try {
      const gasPrices = await getGasPrices();
      const feeLevels = [gasPrices.slow, gasPrices.fast, gasPrices.instant];
      const speedLabels: ('slow' | 'fast' | 'instant')[] = ['slow', 'fast', 'instant'];

      const tokenPriceData = await fetchTokenPriceData(token);
      const tokenPrice = tokenPriceData.price;

      const wethPriceData = await getWETHPrice();
      const ethPrice = wethPriceData.price;

      if (token.erc20) {
        const erc20Token = token.erc20;
        return feeLevels.map((gasPrice, i) => {
          const usdFee = parseFloat((gasPrice * 585000 / 1e9 * ethPrice).toFixed(4));
          if (isNaN(usdFee) || isNaN(tokenPrice)) {
            throw new Error('Invalid usdFee or tokenPrice');
          }
          const tokenFee = Big(usdFee).div(tokenPrice).round(erc20Token.decimals, Big.roundDown).toFixed(4);
          return {
            id: i,
            label: getFeeLabel(speedLabels[i]),
            denom: erc20Token.symbol,
            amount: tokenFee,
            amountInCurrency: usdFee.toString()
          };
        });
      } else if (token.cosmos) {
        const cosmosToken = token.cosmos;
        return feeLevels.map((gasPrice, i) => {
          const usdFee = parseFloat((gasPrice * 585000 / 1e9 * ethPrice).toFixed(4));
          if (isNaN(usdFee) || isNaN(tokenPrice)) {
            throw new Error('Invalid usdFee or tokenPrice');
          }
          const tokenFee = Big(usdFee).div(tokenPrice).round(cosmosToken.decimals, Big.roundDown).toFixed(4);
          return {
            id: i,
            label: getFeeLabel(speedLabels[i]),
            denom: cosmosToken.symbol,
            amount: tokenFee,
            amountInCurrency: usdFee.toString()
          };
        });
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error fetching fees:', error);
      throw error;
    }
  }

  return [];
}

function getFeeLabel (speed: 'slow' | 'fast' | 'instant'): string {
  switch (speed) {
    case 'slow': return '24 Hours';
    case 'fast': return 'Within an hour';
    case 'instant': return 'Instantly';
    default: return 'Unknown';
  }
}

export default {
  isGravityBridgeTransfer,
  transfer,
  getFees
};
