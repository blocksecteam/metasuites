export const SCOPE = 'metaDockChromeExt'

interface ExtSupportWebsite {
  name: string
  domains: string[]
  chain?: string
  /** BTC only */
  href?: string
  chainID?: number
  siteName: string
  logo?: string
}

export const EXT_SUPPORT_WEB_LIST: ExtSupportWebsite[] = [
  {
    name: 'BTC',
    domains: ['btc.com', 'explorer.btc.com'],
    href: 'https://explorer.btc.com/btc',
    chain: 'btc',
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-5.png'
  },
  {
    name: 'ETH',
    domains: ['etherscan.io', 'cn.etherscan.com'],
    chainID: 1,
    chain: 'eth',
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-7.png'
  },
  {
    name: 'BSC',
    chainID: 56,
    domains: ['bscscan.com', 'www.bscscan.com'],
    chain: 'bsc',
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-4.png'
  },
  {
    name: 'Polygon',
    chainID: 137,
    chain: 'polygon',
    domains: ['polygonscan.com'],
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-12.png'
  },
  {
    name: 'Fantom',
    domains: ['ftmscan.com'],
    chain: 'fantom',
    chainID: 250,
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-8.png'
  },
  {
    name: 'Arbitrum',
    domains: ['arbiscan.io'],
    chain: 'arbitrum',
    chainID: 42161,
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-2.png'
  },
  {
    name: 'Cronos',
    chainID: 25,
    domains: ['cronoscan.com'],
    chain: 'cronos',
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-6.png'
  },
  {
    name: 'Moonbeam',
    chainID: 1284,
    chain: 'moonbeam',
    domains: ['moonscan.io', 'www.moonscan.io'],
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671685360787-9.png'
  },
  {
    name: 'Avalanche',
    chainID: 43114,
    chain: 'avalanche',
    domains: ['snowtrace.io'],
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671777583236-3.png'
  },
  {
    name: 'Optimism',
    chainID: 10,
    chain: 'optimism',
    domains: ['optimistic.etherscan.io'],
    siteName: 'SCAN',
    logo: 'https://assets.blocksec.com/image/1671777583236-2.png'
  },
  {
    name: 'OpenSea',
    domains: ['opensea.io'],
    siteName: 'OPENSEA'
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
  'optimism'
]

export const ALTERNATIVE_BLOCK_EXPLORES_SUPPORT_LIST = ['eth']

export const PHALCON_SUPPORT_LIST = [
  {
    pathname: 'eth',
    chain: 'eth',
    supportSimulator: true
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

export const TRANSACTION_VIEWER_SUPPORT_LIST = [
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

export const TX_EXPLAIN_SUPPORT_LIST = ['eth']
