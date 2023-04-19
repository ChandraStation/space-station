import cheqdToGravityBridgeTokens from 'constants/tokens/cheqd-gb-tokens.js';
import cosmosToGravityBridgeTokens from 'constants/tokens/cosmos-gb-tokens';
import gravityBridgeToCheqdTokens from 'constants/tokens/gb-cheqd-tokens';
import gravityBridgeToEthTokens from 'constants/tokens/gb-eth-tokens';
import gravityBridgeToIrisTokens from 'constants/tokens/gb-iris-tokens.json';
import gravityBridgeToOsmosisTokens from 'constants/tokens/gb-osmosis-tokens';
import gravityBridgeToCosmosTokens from 'constants/tokens/gb-cosmos-tokens.json';
import gravityBridgeToStargazeTokens from 'constants/tokens/gb-stargaze-tokens.json';
import irisToGravityBridgeTokens from 'constants/tokens/iris-gb-tokens.json';
import osmosisToGravityBridgeTokens from 'constants/tokens/osmosis-gb-tokens';
import stargazeToGravityBridgeTokens from 'constants/tokens/stargaze-gb-tokens.json';
import chihuahuaToGravityBridgeTokens from 'constants/tokens/chihuahua-gb-tokens';
import gravityBridgeToChihuahuaTokens from 'constants/tokens/gb-chihuahua-tokens';
import gravityBridgeToNyxTokens from 'constants/tokens/gb-nyx-tokens';
import nyxToGravityBridgeTokens from 'constants/tokens/nyx-gb-tokens';
import gravityBridgeToCrescentTokens from 'constants/tokens/gb-crescent-tokens.json';
import crescentToGravityBridgeTokens from 'constants/tokens/crescent-gb-tokens.json';
import gravityBridgeToSecretTokens from 'constants/tokens/gb-secret-tokens.json';
import secretToGravityBridgeTokens from 'constants/tokens/secret-gb-tokens.json';
import gravityBridgeToEvmosTokens from 'constants/tokens/gb-evmos-tokens';
import gravityBridgeToCantoTokens from 'constants/tokens/gb-canto-tokens';
import evmosToGravityBridgeTokens from 'constants/tokens/evmos-gb-tokens';
import cantoToGravityBridgeTokens from 'constants/tokens/canto-gb-tokens';
import gravityBridgeToUnificationTokens from 'constants/tokens/gb-unification-tokens';
import unificationToGravityBridgeTokens from 'constants/tokens/unification-gb-tokens';
import { SupportedChain } from 'types';

export type CosmosTokenWithoutChainId = {
  name: string;
  denom: string;
  decimals: number;
  symbol: string;
  logoURI?: string;
  priceDenom?: string;
}

export const ibcTokenFromToMap: Record<SupportedChain, { [key in SupportedChain]?: Record<string, CosmosTokenWithoutChainId> }> = {
  [SupportedChain.GravityBridge]: {
    [SupportedChain.Eth]: gravityBridgeToEthTokens,
    [SupportedChain.Osmosis]: gravityBridgeToOsmosisTokens,
    [SupportedChain.Cosmos]: gravityBridgeToCosmosTokens,
    [SupportedChain.Stargaze]: gravityBridgeToStargazeTokens,
    [SupportedChain.Cheqd]: gravityBridgeToCheqdTokens,
    [SupportedChain.Iris]: gravityBridgeToIrisTokens,
    [SupportedChain.Chihuahua]: gravityBridgeToChihuahuaTokens,
    [SupportedChain.Nyx]: gravityBridgeToNyxTokens,
    [SupportedChain.Crescent]: gravityBridgeToCrescentTokens,
    [SupportedChain.Secret]: gravityBridgeToSecretTokens,
    [SupportedChain.Evmos]: gravityBridgeToEvmosTokens,
    [SupportedChain.Canto]: gravityBridgeToCantoTokens,
    [SupportedChain.Unification]: gravityBridgeToUnificationTokens
  },
  [SupportedChain.Stargaze]: {
    [SupportedChain.GravityBridge]: stargazeToGravityBridgeTokens
  },
  [SupportedChain.Osmosis]: {
    [SupportedChain.GravityBridge]: osmosisToGravityBridgeTokens
  },
  [SupportedChain.Cosmos]: {
    [SupportedChain.GravityBridge]: cosmosToGravityBridgeTokens
  },
  [SupportedChain.Cheqd]: {
    [SupportedChain.GravityBridge]: cheqdToGravityBridgeTokens
  },
  [SupportedChain.Iris]: {
    [SupportedChain.GravityBridge]: irisToGravityBridgeTokens
  },
  [SupportedChain.Chihuahua]: {
    [SupportedChain.GravityBridge]: chihuahuaToGravityBridgeTokens
  },
  [SupportedChain.Nyx]: {
    [SupportedChain.GravityBridge]: nyxToGravityBridgeTokens
  },
  [SupportedChain.Crescent]: {
    [SupportedChain.GravityBridge]: crescentToGravityBridgeTokens
  },
  [SupportedChain.Secret]: {
    [SupportedChain.GravityBridge]: secretToGravityBridgeTokens
  },
  [SupportedChain.Evmos]: {
    [SupportedChain.GravityBridge]: evmosToGravityBridgeTokens
  },
  [SupportedChain.Canto]: {
    [SupportedChain.GravityBridge]: cantoToGravityBridgeTokens
  },
  [SupportedChain.Unification]: {
    [SupportedChain.GravityBridge]: unificationToGravityBridgeTokens
  },
  [SupportedChain.Eth]: {}
};
