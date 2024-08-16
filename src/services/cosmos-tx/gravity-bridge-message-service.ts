import Big from 'big.js';
import { cosmos, google, gravity } from 'constants/proto';
import loggerFactory from 'services/util/logger-factory';
import { IToken, ITransfer } from 'types';
import { AminoMsg } from '@cosmjs/amino';
import Long from 'long';

const logger = loggerFactory.getLogger('[GravityBridgeMessageService]');

function createSendToEthereumMessage (transfer: ITransfer): google.protobuf.Any {
  const token = transfer.token.erc20 || transfer.token.cosmos;
  if (!token) {
    const errorMessage = 'No token info!';
    logger.error('[createSendToEthereumMessage]', errorMessage);
    throw new Error(errorMessage);
  }

  const decimal = new Big(10).pow(token.decimals);
  const amount = new Big(transfer.amount).times(decimal).toString();
  const feeAmount = transfer.bridgeFee
    ? new Big(transfer.bridgeFee.amount).times(decimal).toString()
    : '0';
  const chainFeeAmount = convertTokenTofee(transfer.token, transfer.chainFee?.amount ?? '');

  const coin = convertTokenToCoin(transfer.token, amount);
  const feeCoin = convertTokenToCoin(transfer.token, feeAmount);
  const sendMessage = new gravity.v1.MsgSendToEth({
    sender: transfer.fromAddress,
    ethDest: transfer.toAddress,
    amount: coin,
    bridgeFee: feeCoin,
    chainFee: chainFeeAmount
  });
  logger.info('[createSendToEthereumMessage] MsgSendToEth:', sendMessage);

  return new google.protobuf.Any({
    type_url: '/gravity.v1.MsgSendToEth',
    value: gravity.v1.MsgSendToEth.encode(sendMessage).finish()
  });
}

function createSendToEthereumAminoMessage (transfer: ITransfer): AminoMsg {
  const token = transfer.token.erc20 || transfer.token.cosmos;
  if (!token) {
    const errorMessage = 'No token info!';
    logger.error('[createSendToEthereumAminoMessage]', errorMessage);
    throw new Error(errorMessage);
  }

  const decimal = new Big(10).pow(token.decimals);
  const amount = new Big(transfer.amount).times(decimal).toString();
  const feeAmount = transfer.bridgeFee
    ? new Big(transfer.bridgeFee.amount).times(decimal).toString()
    : '0';

  const chainFeeAmount = convertTokenTofee(transfer.token, transfer.chainFee?.amount ?? '');

  const coin = convertTokenToCoin(transfer.token, amount);
  const feeCoin = convertTokenToCoin(transfer.token, feeAmount);
  const message: AminoMsg = {
    type: 'gravity/MsgSendToEth',
    value: {
      sender: transfer.fromAddress,
      eth_dest: transfer.toAddress,
      amount: coin,
      bridge_fee: feeCoin,
      chain_fee: chainFeeAmount
    }
  };

  logger.info('[createSendToEthereumAminoMessage] MsgSendToEth:', message);
  return message;
}

function convertTokenToCoin (token: IToken, amount: string): cosmos.base.v1beta1.ICoin {
  if (token.erc20) {
    return {
      denom: `gravity${token.erc20.address}`,
      amount
    };
  } else if (token.cosmos) {
    return {
      denom: token.cosmos.denom,
      amount
    };
  } else {
    const errorMessage = 'No token info!';
    logger.error('[convertTokenToCoin]', errorMessage);
    throw new Error(errorMessage);
  }
}

function convertTokenTofee (token: IToken, amount: string): cosmos.base.v1beta1.ICoin {
  const decimals = token.erc20?.decimals || token.cosmos?.decimals || 6;
  const decimal = new Big(10).pow(decimals);
  const feeAmount = new Big(amount).times(decimal).round(0, Big.roundUp).toString();

  if (token.erc20) {
    return {
      denom: `gravity${token.erc20.address}`,
      amount: feeAmount
    };
  } else if (token.cosmos) {
    return {
      denom: token.cosmos.denom,
      amount: feeAmount
    };
  } else {
    const errorMessage = 'No token info!';
    logger.error('[convertTokenTofee]', errorMessage);
    throw new Error(errorMessage);
  }
}

export default {
  createSendToEthereumMessage,
  createSendToEthereumAminoMessage
};
