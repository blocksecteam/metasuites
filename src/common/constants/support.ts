import BaseConstant from './abstract/BaseConstants'

export const SCOPE = 'metaDockChromeExt'

export interface ExtSupportWebsite {
  name: string
  domains: string[]
  chain?: string
  /** BTC only */
  href?: string
  chainID?: number
  siteName: string
  logo: string
  testNets?: ExtSupportWebsite[]
}

export const EXT_SUPPORT_WEB_LIST: ExtSupportWebsite[] = [
  {
    name: 'BTC',
    domains: ['explorer.btc.com'],
    href: 'https://explorer.btc.com/btc',
    chain: 'btc',
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-5.png'
  },
  {
    name: 'ETH',
    domains: ['etherscan.io', 'cn.etherscan.com', 'goto.etherscan.com'],
    chainID: 1,
    chain: 'eth',
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-7.png',
    testNets: [
      {
        name: 'Sepolia',
        domains: ['sepolia.etherscan.io'],
        chainID: 11_155_111,
        chain: 'sepolia.eth',
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671685360787-7.png'
      },
      {
        name: 'Goerli',
        domains: ['goerli.etherscan.io'],
        chainID: 5,
        chain: 'gor.eth',
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671685360787-7.png'
      }
    ]
  },
  {
    name: 'BSC',
    chainID: 56,
    domains: ['bscscan.com', 'www.bscscan.com', 'goto.bscscan.com'],
    chain: 'bsc',
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-4.png',
    testNets: [
      {
        name: 'Binance Smart Chain Testnet',
        chainID: 97,
        domains: ['testnet.bscscan.com'],
        chain: 'test.bsc',
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671685360787-4.png'
      },
      {
        name: 'opBNB Testnet',
        chainID: 5611,
        domains: ['opbnb-testnet.bscscan.com'],
        chain: 'test.op',
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671685360787-4.png'
      }
    ]
  },
  {
    name: 'Polygon',
    chainID: 137,
    chain: 'polygon',
    domains: ['polygonscan.com'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-12.png',
    testNets: [
      {
        name: 'Polygon Mumbai',
        chainID: 80_001,
        chain: 'mumbai.polygon',
        domains: ['mumbai.polygonscan.com'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671685360787-12.png'
      }
    ]
  },
  {
    name: 'Fantom',
    domains: ['ftmscan.com'],
    chain: 'fantom',
    chainID: 250,
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-8.png',
    testNets: [
      {
        name: 'Fantom Testnet',
        domains: ['testnet.ftmscan.com'],
        chain: 'test.fantom',
        chainID: 4_002,
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671685360787-8.png'
      }
    ]
  },
  {
    name: 'Arbitrum',
    domains: ['arbiscan.io'],
    chain: 'arbitrum',
    chainID: 42_161,
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-2.png',
    testNets: [
      {
        name: 'Arbitrum Goerli',
        domains: ['testnet.arbiscan.io'],
        chain: 'gor.arbitrum',
        chainID: 421_613,
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671685360787-2.png'
      }
    ]
  },
  {
    name: 'Cronos',
    chainID: 25,
    domains: ['cronoscan.com'],
    chain: 'cronos',
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-6.png'
  },
  {
    name: 'Moonbeam',
    chainID: 1284,
    chain: 'moonbeam',
    domains: ['moonscan.io', 'www.moonscan.io', 'moonbeam.moonscan.io'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-9.png',
    testNets: [
      {
        name: 'Moonbase Alpha',
        chainID: 1287,
        chain: 'moonbase',
        domains: ['moonbase.moonscan.io'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671685360787-9.png'
      }
    ]
  },
  {
    name: 'Avalanche',
    chainID: 43114,
    chain: 'avalanche',
    domains: ['snowtrace.io'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671777583236-3.png'
    // testNets: [
    //   {
    //     name: 'Avalanche Fuji',
    //     chainID: 43_113,
    //     chain: 'fuji.avalanche',
    //     domains: ['testnet.snowtrace.io'],
    //     siteName: 'ETHERSCAN',
    //     logo: 'https://assets.blocksec.com/image/1671777583236-3.png'
    //   }
    // ]
  },
  {
    name: 'Optimism',
    chainID: 10,
    chain: 'optimism',
    domains: ['optimistic.etherscan.io'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671777583236-2.png',
    testNets: [
      {
        name: 'Optimism Goerli',
        chainID: 420,
        chain: 'gor.optimism',
        domains: ['goerli-optimism.etherscan.io'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671777583236-2.png'
      }
    ]
  },
  {
    name: 'Arbitrum Nova',
    domains: ['nova.arbiscan.io'],
    chain: 'nova.arbitrum',
    chainID: 42_170,
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695376609975-2.png'
  },
  {
    name: 'Moonriver',
    chainID: 1285,
    chain: 'moonriver',
    domains: ['moonriver.moonscan.io'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197156966-2.png'
  },
  {
    name: 'BitTorrent',
    chainID: 199,
    chain: 'btt',
    domains: ['bttcscan.com'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197176921-2.png',
    testNets: [
      {
        name: 'Donau',
        chainID: 1028,
        chain: 'test.btt',
        domains: ['testnet.bttcscan.com'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1695197176921-2.png'
      }
    ]
  },
  {
    name: 'Celo',
    chainID: 42_220,
    chain: 'celo',
    domains: ['celoscan.io'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197240068-2.png',
    testNets: [
      {
        name: 'Alfajores',
        chainID: 44_787,
        chain: 'alfa.celo',
        domains: ['alfajores.celoscan.io'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1695197240068-2.png'
      }
    ]
  },
  {
    name: 'Gnosis',
    chainID: 100,
    chain: 'gnosis',
    domains: ['gnosisscan.io'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197286815-3.png'
  },
  {
    name: 'Base',
    chainID: 8453,
    chain: 'base',
    domains: ['basescan.org'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197286815-2.png',
    testNets: [
      {
        name: 'Base Goerli',
        chainID: 84531,
        chain: 'gor.base',
        domains: ['goerli.basescan.org'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1695197286815-2.png'
      }
    ]
  },
  {
    name: 'Polygon zkEVM',
    chainID: 1101,
    chain: 'zkevm',
    domains: ['zkevm.polygonscan.com'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197286815-5.png',
    testNets: [
      {
        name: 'Polygon zkEVM Testnet',
        chainID: 1442,
        chain: 'test.zkevm',
        domains: ['testnet-zkevm.polygonscan.com'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1695197286815-5.png'
      }
    ]
  },
  {
    name: 'Linea',
    chainID: 59_144,
    chain: 'linea',
    domains: ['lineascan.build'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197286815-4.png',
    testNets: [
      {
        name: 'Linea Goerli Testnet',
        chainID: 59_140,
        chain: 'test.linea',
        domains: ['goerli.lineascan.build'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1695197286815-4.png'
      }
    ]
  },
  {
    name: 'WEMIX',
    chainID: 1111,
    chain: 'wemix',
    domains: ['wemixscan.com', 'www.wemixscan.com'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197286815-6.png',
    testNets: [
      {
        name: 'WEMIX3.0 Testnet',
        chainID: 1112,
        chain: 'test.wemix',
        domains: ['testnet.wemixscan.com'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1695197286815-6.png'
      }
    ]
  },
  {
    name: 'OpenSea',
    domains: ['opensea.io'],
    siteName: 'OPENSEA',
    logo: 'https://assets.blocksec.com/image/1695197676298-2.png'
  },
  {
    name: 'TRON',
    chain: 'tron',
    domains: ['tronscan.org'],
    siteName: 'TRONSCAN',
    logo: 'https://assets.blocksec.com/image/1677553092680-4.jpg'
  },
  {
    name: 'zkSync Era',
    chain: 'era.zksync',
    domains: ['era.zksync.network'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1704853828982-2.svg'
  }
]

export const SLEUTH_SUPPORT_LIST = [
  'eth',
  'bsc',
  'polygon',
  'fantom',
  'arbitrum',
  'cronos',
  'moonbeam',
  'avalanche',
  'optimism',
  'linea',
  'base',
  'tron'
]

export const ALTERNATIVE_BLOCK_EXPLORES_SUPPORT_LIST = ['eth']

export const PHALCON_SUPPORT_LIST = [
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
  },
  {
    pathname: 'linea',
    chain: 'linea',
    supportSimulator: false
  },
  {
    pathname: 'base',
    chain: 'base',
    supportSimulator: false
  },
  {
    pathname: 'zksync-era',
    chain: 'era.zksync',
    supportSimulator: false
  }
]

export const OPENCHAIN_SUPPORT_LIST = [
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

export const TENDERLY_SUPPORT_LIST = [
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

/** https://library.dedaub.com/ */
export const DEDAUB_SUPPORT_DIRECT_LIST = [
  {
    chain: 'eth',
    pathname: 'ethereum'
  },
  {
    chain: 'fantom',
    pathname: 'fantom'
  },
  {
    chain: 'arbitrum',
    pathname: 'arbitrum'
  },
  {
    chain: 'base',
    pathname: 'base'
  }
]

export const ETHERSCAN_DETH_SUPPORT_LIST = [
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

/** https://ethervm.io */
export const ETHERVM_SUPPORT_DIRECT_LIST = [
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
  },
  {
    chain: 'tron',
    url: 'https://ethervm.io/decompile/tron'
  }
]

/** phalcon simulator */
export const SIMULATE_SUPPORT_LIST = [
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

export const TX_EXPLAIN_SUPPORT_LIST = [
  'eth'
  // 'bsc',
  // 'polygon',
  // 'fantom',
  // 'avalanche',
  // 'optimism'
]

export const EVM_STORAGE_SUPPORT_LIST = ['eth']

export class TransactionParsers extends BaseConstant {
  static PHALCON = new BaseConstant(
    'phalcon',
    'phalcon',
    'https://phalcon.blocksec.com/explorer'
  )
  static TENDERLY = new BaseConstant(
    'tenderly',
    'tenderly',
    'https://dashboard.tenderly.co'
  )
  static OPENCHAIN = new BaseConstant(
    'openchain',
    'openchain',
    'https://openchain.xyz/trace'
  )
  static DEDAUB = new BaseConstant(
    'dedaub',
    'dedaub',
    'https://library.dedaub.com'
  )
}

export const PROXY_LOG_SUPPORT_LIST = [
  'eth',
  'bsc',
  'polygon',
  'fantom',
  'arbitrum',
  'cronos',
  'moonbeam',
  'avalanche',
  'optimism'
]

export const VARIABLE_LOG_SUPPORT_LIST = [
  'eth',
  'bsc',
  'arbitrum',
  'optimism',
  'polygon',
  'avalanche'
]

export const DEBANK_SUPPORT_LIST = [
  'eth',
  'bsc',
  'polygon',
  'fantom',
  'arbitrum',
  'cronos',
  'moonbeam',
  'avalanche',
  'optimism',
  'base',
  'zkevm',
  'linea',
  'btt',
  'celo',
  'gnosis',
  'moonriver',
  'wemix',
  'nova.arbitrum',
  'era.zksync'
]

export const APPROVAL_DIAGNOSIS_SUPPORT_LIST = [
  'eth',
  'bsc',
  'polygon',
  'fantom',
  'arbitrum',
  'cronos',
  'moonbeam',
  'avalanche',
  'optimism',
  'moonriver',
  'btt',
  'celo',
  'gnosis',
  'base',
  'zkevm',
  'linea',
  'wemix',
  'tron'
]
