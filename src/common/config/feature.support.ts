import BaseFeatureSupport from '@common/constants/abstract/BaseFeatureSupport'

// prettier-ignore
export class FeatureActiveSupport {
  static DEBANK = new BaseFeatureSupport('debank', ['eth', 'bsc', 'polygon', 'fantom', 'arbitrum', 'cronos', 'moonbeam', 'avalanche', 'optimism', 'base', 'zkevm', 'linea', 'btt', 'celo', 'gnosis', 'moonriver', 'wemix', 'nova.arbitrum'])
  static APPROVAL_DIAGNOSIS = new BaseFeatureSupport('approval-diagnosis', ['eth', 'bsc', 'polygon', 'fantom', 'arbitrum', 'cronos', 'moonbeam', 'avalanche', 'optimism', 'moonriver', 'btt', 'celo', 'gnosis', 'base', 'zkevm', 'linea', 'wemix'])
  static PROXY_CONTRACT_LOG = new BaseFeatureSupport('proxy-contract-log', ['eth', 'bsc', 'polygon', 'fantom', 'arbitrum', 'cronos', 'moonbeam', 'avalanche', 'optimism'])
  static TRANSACTION_EXPLAIN = new BaseFeatureSupport('transaction-explain', ['eth'])
  static EVM_STORAGE = new BaseFeatureSupport('evm-storage', ['eth'])
  static TRANSACTION_SIMULATOR = new BaseFeatureSupport(
    'transaction-simulator',
    ['eth', 'bsc', 'polygon', 'fantom', 'arbitrum', 'avalanche', 'optimism'],
    [
      {
        chain: 'eth',
        name: 'ETH',
        logo: 'https://assets.blocksec.com/image/1671685360787-7.png',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
      },
      {
        chain: 'bsc',
        name: 'BSC',
        logo: 'https://assets.blocksec.com/image/1671685360787-4.png',
        nativeCurrency: {
          decimals: 18,
          name: 'BNB',
          symbol: 'BNB'
        }
      },
      {
        name: 'Polygon',
        chain: 'polygon',
        logo: 'https://assets.blocksec.com/image/1671685360787-12.png',
        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 }
      },
      {
        name: 'Fantom',
        chain: 'fantom',
        logo: 'https://assets.blocksec.com/image/1671685360787-8.png',
        nativeCurrency: {
          decimals: 18,
          name: 'Fantom',
          symbol: 'FTM'
        }
      },
      {
        name: 'Arbitrum',
        chain: 'arbitrum',
        logo: 'https://assets.blocksec.com/image/1671685360787-2.png',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
      },
      {
        name: 'Avalanche',
        chain: 'avalanche',
        logo: 'https://assets.blocksec.com/image/1671777583236-3.png',
        nativeCurrency: {
          decimals: 18,
          name: 'Avalanche',
          symbol: 'AVAX'
        }
      },
      {
        name: 'Optimism',
        chain: 'optimism',
        logo: 'https://assets.blocksec.com/image/1671777583236-2.png',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
      }
    ]
  )
  static ETHERVM = new BaseFeatureSupport(
    'decompile-in-ethervm',
    ['eth', 'bsc', 'gor.eth', 'sepolia.eth'],
    [
      {
        chain: 'eth',
        url: 'https://ethervm.io/decompile'
      },
      {
        chain: 'bsc',
        url: 'https://ethervm.io/decompile/binance'
      },
      {
        chain: 'gor.eth',
        url: 'https://ethervm.io/decompile/goerli'
      },
      {
        chain: 'sepolia.eth',
        url: 'https://ethervm.io/decompile/sepolia'
      }
    ]
  )
  static ETHERSCAN_DETH = new BaseFeatureSupport(
    'etherscan_deth',
    ['eth', 'bsc', 'polygon', 'fantom', 'optimism', 'arbitrum', 'avalanche', 'cronos'],
    [
      {
        chain: 'eth',
        url: 'https://etherscan.deth.net/address'
      },
      {
        chain: 'bsc',
        url: 'https://bscscan.deth.net/address'
      },
      {
        chain: 'polygon',
        url: 'https://polygonscan.deth.net/address'
      },
      {
        chain: 'fantom',
        url: 'https://ftmscan.deth.net/address'
      },
      {
        chain: 'optimism',
        url: 'https://optimistic.etherscan.deth.net/address'
      },
      {
        chain: 'arbitrum',
        url: 'https://arbiscan.deth.net/address'
      },
      {
        chain: 'avalanche',
        url: 'https://snowtrace.deth.net/address'
      },
      {
        chain: 'cronos',
        url: 'https://cronoscan.deth.net/address'
      }
    ]
  )

  static TENDERLY = new BaseFeatureSupport(
    'tenderly',
    ['polygon', 'bsc', 'arbitrum', 'fantom', 'avalanche', 'eth', 'optimism', 'base', 'cronos', 'moonbeam', 'moonriver', 'gnosis', 'gor.eth', 'test.fantom', 'gor.optimism', 'mumbai.polygon', 'sepolia.eth', 'gor.base', 'gor.arbitrum', 'nova.arbitrum'],
    [
      {
        pathname: 'polygon',
        chain: 'polygon'
      },
      {
        pathname: 'binance',
        chain: 'bsc'
      },
      {
        pathname: 'arbitrum',
        chain: 'arbitrum'
      },
      {
        pathname: 'fantom',
        chain: 'fantom'
      },
      {
        pathname: 'ava',
        chain: 'avalanche'
      },
      {
        pathname: 'mainnet',
        chain: 'eth'
      },
      {
        pathname: 'optimistic',
        chain: 'optimism'
      },
      {
        pathname: 'base',
        chain: 'base'
      },
      {
        pathname: 'cronos',
        chain: 'cronos'
      },
      {
        pathname: 'moonbeam',
        chain: 'moonbeam'
      },
      {
        pathname: 'moonriver',
        chain: 'moonriver'
      },
      {
        pathname: 'gnosis-chain',
        chain: 'gnosis'
      },
      {
        pathname: 'goerli',
        chain: 'gor.eth'
      },
      {
        pathname: 'fantom-testnet',
        chain: 'test.fantom'
      },
      {
        pathname: 'optimistic-goerli',
        chain: 'gor.optimism'
      },
      {
        pathname: 'polygon-mumbai',
        chain: 'mumbai.polygon'
      },
      {
        pathname: 'sepolia',
        chain: 'sepolia.eth'
      },
      {
        pathname: 'base-goerli',
        chain: 'gor.base'
      },
      {
        pathname: 'arbitrum-goerli',
        chain: 'gor.arbitrum'
      },
      {
        pathname: 'arbitrum-nova',
        chain: 'nova.arbitrum'
      }
    ]
  )
  static OPENCHAIN = new BaseFeatureSupport(
    'openchain',
    ['eth', 'polygon', 'optimism', 'bsc', 'avalanche', 'arbitrum', 'fantom'],
    [
      {
        pathname: 'ethereum',
        chain: 'eth'
      },
      {
        pathname: 'polygon',
        chain: 'polygon'
      },
      {
        pathname: 'optimism',
        chain: 'optimism'
      },
      {
        pathname: 'binance',
        chain: 'bsc'
      },
      {
        pathname: 'avalanche',
        chain: 'avalanche'
      },
      {
        pathname: 'arbitrum',
        chain: 'arbitrum'
      },
      {
        pathname: 'fantom',
        chain: 'fantom'
      }
    ]
  )
  static PHALCON = new BaseFeatureSupport(
    'phalcon',
    ['eth', 'sepolia.eth', 'gor.eth', 'polygon', 'bsc', 'avalanche', 'arbitrum', 'optimism', 'fantom'],
    [
      {
        pathname: 'eth',
        chain: 'eth',
        supportSimulator: true
      },
      {
        pathname: 'sepolia',
        chain: 'sepolia.eth',
        supportSimulator: false
      },
      {
        pathname: 'goerli',
        chain: 'gor.eth',
        supportSimulator: false
      },
      {
        pathname: 'polygon',
        chain: 'polygon',
        supportSimulator: true
      },
      {
        pathname: 'bsc',
        chain: 'bsc',
        supportSimulator: true
      },
      {
        pathname: 'avax',
        chain: 'avalanche',
        supportSimulator: true
      },
      {
        pathname: 'arbitrum',
        chain: 'arbitrum',
        supportSimulator: true
      },
      {
        pathname: 'optimism',
        chain: 'optimism',
        supportSimulator: true
      },
      {
        pathname: 'ftm',
        chain: 'fantom',
        supportSimulator: false
      }
    ]
  )
  static ALTERNATIVE_BLOCK_EXPLORES = new BaseFeatureSupport('alternative-block-explorers', ['eth'])
  static METASLEUTH = new BaseFeatureSupport('metasleuth', ['eth', 'bsc', 'polygon', 'fantom', 'arbitrum', 'cronos', 'moonbeam', 'avalanche', 'optimism', 'linea', 'base'])
  static FORTA_ALERT = new BaseFeatureSupport('forta-alert', ['eth','bsc', 'polygon', 'fantom', 'arbitrum' ,'avalanche', 'optimism'])
  static CONTRACT_PRIVATE_VARIABLES = new BaseFeatureSupport('contract-private-variables', ['eth', 'bsc', 'polygon', 'arbitrum', 'avalanche', 'optimism'])
}
