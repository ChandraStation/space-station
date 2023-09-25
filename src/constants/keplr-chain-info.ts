import { ChainInfo } from '@keplr-wallet/types';

const gravityBridge: ChainInfo = {
  chainName: 'GravityBridge',
  chainId: 'gravity-bridge-3',
  rest: 'https://nodes.chandrastation.com/api/gravity/',
  rpc: 'https://nodes.chandrastation.com/rpc/gravity/',
  stakeCurrency: {
    coinDenom: 'GRAVITON',
    coinMinimalDenom: 'ugraviton',
    coinDecimals: 6
  },
  bip44: {
    coinType: 118
  },
  bech32Config: {
    bech32PrefixAccAddr: 'gravity',
    bech32PrefixAccPub: 'gravitypub',
    bech32PrefixValAddr: 'gravityvaloper',
    bech32PrefixValPub: 'gravityvaloperpub',
    bech32PrefixConsAddr: 'gravityvalcons',
    bech32PrefixConsPub: 'gravityvalconspub'
  },
  currencies: [
    {
      coinDenom: 'GRAVITON',
      coinMinimalDenom: 'ugraviton',
      coinDecimals: 6
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'GRAVITON',
      coinMinimalDenom: 'ugraviton',
      coinDecimals: 6
    }
  ],
  gasPriceStep: {
    low: 100000,
    average: 1000000,
    high: 100000000
  }
};

const cheqd: ChainInfo = {
  chainName: 'cheqd',
  chainId: 'cheqd-mainnet-1',
  rest: 'https://api.cheqd.net',
  rpc: 'https://rpc.cheqd.net',
  stakeCurrency: {
    coinDenom: 'CHEQ',
    coinMinimalDenom: 'ncheq',
    coinDecimals: 9
  },
  bip44: {
    coinType: 118
  },
  bech32Config: {
    bech32PrefixAccAddr: 'cheqd',
    bech32PrefixAccPub: 'cheqdpub',
    bech32PrefixValAddr: 'cheqdvaloper',
    bech32PrefixValPub: 'cheqdvaloperpub',
    bech32PrefixConsAddr: 'cheqdvalcons',
    bech32PrefixConsPub: 'cheqdvalconspub'
  },
  currencies: [
    {
      coinDenom: 'CHEQ',
      coinMinimalDenom: 'ncheq',
      coinDecimals: 9
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'CHEQ',
      coinMinimalDenom: 'ncheq',
      coinDecimals: 9
    }
  ],
  gasPriceStep: {
    low: 25,
    average: 30,
    high: 50
  }
};

const chihuahua: ChainInfo = {
  chainId: 'chihuahua-1',
  chainName: 'Chihuahua',
  rpc: 'https://rpc.chihuahua.wtf',
  rest: 'https://rest.flixnet-4.omniflix.network',
  stakeCurrency: {
    coinDenom: 'HUAHUA',
    coinMinimalDenom: 'uhuahua',
    coinDecimals: 6,
    coinGeckoId: '-'
  },
  bip44: {
    coinType: 118
  },
  bech32Config: {
    bech32PrefixAccAddr: 'chihuahua',
    bech32PrefixAccPub: 'chihuahuapub',
    bech32PrefixValAddr: 'chihuahuavaloper',
    bech32PrefixValPub: 'chihuahuavaloperpub',
    bech32PrefixConsAddr: 'chihuahuavalcons',
    bech32PrefixConsPub: 'chihuahuavalconspub'
  },
  currencies: [
    {
      coinDenom: 'HUAHUA',
      coinMinimalDenom: 'uhuahua',
      coinDecimals: 6,
      coinGeckoId: '-'
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'HUAHUA',
      coinMinimalDenom: 'uhuahua',
      coinDecimals: 6,
      coinGeckoId: '-'
    }
  ],
  gasPriceStep: {
    low: 0.025,
    average: 0.03,
    high: 0.04
  },
  features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go']
};

const nyx: ChainInfo = {
  chainId: 'nyx',
  chainName: 'NYX',
  rpc: 'https://rpc-nym.cosmostation.io',
  rest: 'https://lcd-nym.cosmostation.io',
  stakeCurrency: {
    coinDenom: 'NYX',
    coinMinimalDenom: 'unyx',
    coinDecimals: 6,
    coinGeckoId: '-'
  },
  bip44: {
    coinType: 118
  },
  bech32Config: {
    bech32PrefixAccAddr: 'n',
    bech32PrefixAccPub: 'npub',
    bech32PrefixValAddr: 'nvaloper',
    bech32PrefixValPub: 'nvaloperpub',
    bech32PrefixConsAddr: 'nvalcons',
    bech32PrefixConsPub: 'nvalconspub'
  },
  currencies: [
    {
      coinDenom: 'NYX',
      coinMinimalDenom: 'unyx',
      coinDecimals: 6,
      coinGeckoId: '-'
    },
    {
      coinDenom: 'NYM',
      coinMinimalDenom: 'unym',
      coinDecimals: 6,
      coinGeckoId: '-'
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'NYM',
      coinMinimalDenom: 'unym',
      coinDecimals: 6,
      coinGeckoId: '-'
    }
  ],
  gasPriceStep: {
    low: 0.025,
    average: 0.03,
    high: 0.04
  },
  features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go']
};

const crescent: ChainInfo = {
  chainId: 'crescent-1',
  chainName: 'CRESCENT',
  rpc: 'https://mainnet.crescent.network:26657',
  rest: 'https://lcd-crescent.cosmostation.io',
  stakeCurrency: {
    coinDenom: 'CRE',
    coinMinimalDenom: 'ucre',
    coinDecimals: 6,
    coinGeckoId: '-'
  },
  bip44: {
    coinType: 118
  },
  bech32Config: {
    bech32PrefixAccAddr: 'cre',
    bech32PrefixAccPub: 'crepub',
    bech32PrefixValAddr: 'crevaloper',
    bech32PrefixValPub: 'crevaloperpub',
    bech32PrefixConsAddr: 'crevalcons',
    bech32PrefixConsPub: 'crevalconspub'
  },
  currencies: [
    {
      coinDenom: 'CRE',
      coinMinimalDenom: 'ucre',
      coinDecimals: 6,
      coinGeckoId: '-'
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'CRE',
      coinMinimalDenom: 'ucre',
      coinDecimals: 6,
      coinGeckoId: '-'
    }
  ],
  gasPriceStep: {
    low: 0.01,
    high: 0.1,
    average: 0.02
  },
  features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go']
};

const secret: ChainInfo = {
  chainId: 'secret-4',
  chainName: 'SECRET',
  rpc: 'https://api.scrt.network:26657',
  rest: 'https://api.scrt.network',
  stakeCurrency: {
    coinDenom: 'SCRT',
    coinMinimalDenom: 'uscrt',
    coinDecimals: 6,
    coinGeckoId: 'secret'
  },
  bip44: {
    coinType: 529
  },
  bech32Config: {
    bech32PrefixAccAddr: 'secret',
    bech32PrefixAccPub: 'secretpub',
    bech32PrefixValAddr: 'secretvaloper',
    bech32PrefixValPub: 'secretvaloperpub',
    bech32PrefixConsAddr: 'secretvalcons',
    bech32PrefixConsPub: 'secretvalconspub'
  },
  currencies: [
    {
      coinDenom: 'SCRT',
      coinMinimalDenom: 'uscrt',
      coinDecimals: 6,
      coinGeckoId: 'secret'
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'SCRT',
      coinMinimalDenom: 'uscrt',
      coinDecimals: 6,
      coinGeckoId: 'secret'
    }
  ],
  gasPriceStep: {
    low: 0.01,
    high: 0.1,
    average: 0.02
  },
  features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go']
};

const evmos: ChainInfo = {
  chainId: 'evmos_9001-2',
  chainName: 'Evmos',
  rpc: 'https://tendermint.bd.evmos.org:26657',
  rest: 'https://rest.bd.evmos.org:1317',
  stakeCurrency: {
    coinDenom: 'EVMOS',
    coinMinimalDenom: 'aevmos',
    coinDecimals: 18,
    coinGeckoId: 'evmos'
  },
  bip44: {
    coinType: 60
  },
  bech32Config: {
    bech32PrefixAccAddr: 'evmos',
    bech32PrefixAccPub: 'evmospub',
    bech32PrefixValAddr: 'evmosvaloper',
    bech32PrefixValPub: 'evmosvaloperpub',
    bech32PrefixConsAddr: 'evmosvalcons',
    bech32PrefixConsPub: 'evmosvalconspub'
  },
  currencies: [
    {
      coinDenom: 'EVMOS',
      coinMinimalDenom: 'aevmos',
      coinDecimals: 18,
      coinGeckoId: 'evmos'
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'EVMOS',
      coinMinimalDenom: 'aevmos',
      coinDecimals: 18,
      coinGeckoId: 'evmos'
    }
  ],
  gasPriceStep: {
    low: 25000000,
    average: 4000000,
    high: 80000000
  },
  features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go']
};

const canto: ChainInfo = {
  chainId: 'canto_7700-1',
  chainName: 'Canto',
  rpc: 'https://canto.rpc.chandrastation.com:443',
  rest: 'https://canto.api.chandrastation.com',
  stakeCurrency: {
    coinDenom: 'CANTO',
    coinMinimalDenom: 'acanto',
    coinDecimals: 18,
    coinGeckoId: 'canto'
  },
  bip44: {
    coinType: 60
  },
  bech32Config: {
    bech32PrefixAccAddr: 'canto',
    bech32PrefixAccPub: 'cantopub',
    bech32PrefixValAddr: 'cantovaloper',
    bech32PrefixValPub: 'cantovaloperpub',
    bech32PrefixConsAddr: 'cantovalcons',
    bech32PrefixConsPub: 'cantovalconspub'
  },
  currencies: [
    {
      coinDenom: 'Canto',
      coinMinimalDenom: 'acanto',
      coinDecimals: 18,
      coinGeckoId: 'canto'
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'Canto',
      coinMinimalDenom: 'acanto',
      coinDecimals: 18,
      coinGeckoId: 'canto'
    }
  ],
  gasPriceStep: {
    low: 2000000000000,
    average: 2000000000000,
    high: 4000000000000
  },
  features: ['eth-address-gen', 'eth-key-sign', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go']
};

const unification: ChainInfo = {
  chainId: 'FUND-MainNet-2',
  chainName: 'Unification',
  rpc: 'https://rpc1.unification.io',
  rest: 'https://rest.unification.io',
  stakeCurrency: {
    coinDenom: 'FUND',
    coinMinimalDenom: 'nund',
    coinDecimals: 9,
    coinGeckoId: 'unification'
  },
  bip44: {
    coinType: 5555
  },
  bech32Config: {
    bech32PrefixAccAddr: 'und',
    bech32PrefixAccPub: 'undpub',
    bech32PrefixValAddr: 'undvaloper',
    bech32PrefixValPub: 'undvaloperpub',
    bech32PrefixConsAddr: 'undvalcons',
    bech32PrefixConsPub: 'undvalconspub'
  },
  currencies: [
    {
      coinDenom: 'FUND',
      coinMinimalDenom: 'nund',
      coinDecimals: 9,
      coinGeckoId: 'unification'
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'FUND',
      coinMinimalDenom: 'nund',
      coinDecimals: 9,
      coinGeckoId: 'unification'
    }
  ],
  gasPriceStep: {
    low: 25,
    average: 50,
    high: 100
  },
  features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go']
};

const chainInfoMap: Record<string, ChainInfo> = {
  gravityBridge,
  cheqd,
  chihuahua,
  nyx,
  crescent,
  secret,
  evmos,
  canto,
  unification
};

export default chainInfoMap;
