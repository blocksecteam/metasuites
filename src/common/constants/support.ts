export const SCOPE = 'metaDockChromeExt'

interface ExtSupportWebsite {
  name: string
  domains: string[]
  chain: string
  /** BTC only */
  href?: string
  chainID?: number
  fullName?: string
  scanHrefPrefix?: string
}

interface ToolsSupportWebsite {
  pathname: string
  chain: string
}

export const SUPPORT_WEB_LIST: ExtSupportWebsite[] = [
  {
    name: 'BTC',
    domains: ['btc.com', 'explorer.btc.com'],
    href: 'https://explorer.btc.com/btc',
    chain: 'btc'
  },
  {
    name: 'ETH',
    domains: ['etherscan.io', 'cn.etherscan.com'],
    chainID: 1,
    chain: 'eth',
    fullName: 'Ethereum',
    scanHrefPrefix: 'https://etherscan.io/address'
  },
  {
    name: 'BSC',
    chainID: 56,
    domains: ['bscscan.com', 'www.bscscan.com'],
    chain: 'bsc',
    fullName: 'Binance Smart Chain',
    scanHrefPrefix: 'https://bscscan.com/address'
  },
  {
    name: 'Polygon',
    chainID: 137,
    chain: 'polygon',
    domains: ['polygonscan.com'],
    scanHrefPrefix: 'https://polygonscan.com/address'
  },
  {
    name: 'Fantom',
    domains: ['ftmscan.com'],
    chain: 'fantom',
    chainID: 250,
    scanHrefPrefix: 'https://ftmscan.com/address'
  },
  {
    name: 'Arbitrum',
    domains: ['arbiscan.io'],
    chain: 'arbitrum',
    chainID: 42161,
    scanHrefPrefix: 'https://arbiscan.io/address'
  },
  {
    name: 'Cronos',
    chainID: 25,
    domains: ['cronoscan.com'],
    chain: 'cronos',
    scanHrefPrefix: 'https://cronoscan.com/address'
  },
  {
    name: 'Moonbeam',
    chainID: 1284,
    chain: 'moonbeam',
    domains: ['moonscan.io', 'www.moonscan.io'],
    scanHrefPrefix: 'https://moonscan.io/address'
  },
  {
    name: 'Avalanche',
    chainID: 43114,
    chain: 'avalanche',
    domains: ['snowtrace.io'],
    scanHrefPrefix: 'https://snowtrace.io/address'
  },
  {
    name: 'Optimism',
    chainID: 10,
    chain: 'optimism',
    domains: ['optimistic.etherscan.io'],
    scanHrefPrefix: 'https://optimistic.etherscan.io/address'
  }
]

export const PHALCON_SUPPORT_LIST: ToolsSupportWebsite[] = [
  {
    pathname: 'eth',
    chain: 'eth'
  },
  {
    pathname: 'polygon',
    chain: 'polygon'
  },
  {
    pathname: 'bsc',
    chain: 'bsc'
  },
  {
    pathname: 'avax',
    chain: 'avalanche'
  },
  {
    pathname: 'cro',
    chain: 'cronos'
  }
]

export const TRANSACTION_VIEWER_SUPPORT_LIST: ToolsSupportWebsite[] = [
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

export const TENDERLY_SUPPORT_LIST: ToolsSupportWebsite[] = [
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
export const DEDAUB_SUPPORT_DIRECT_LIST: ToolsSupportWebsite[] = [
  {
    chain: 'eth',
    pathname: 'Ethereum'
  },
  {
    chain: 'fantom',
    pathname: 'Fantom'
  }
]
