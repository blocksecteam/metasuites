export const SCOPE = 'metaDockChromeExt'

interface ExtSupportWebsite {
  name: string
  domains: string[]
  chain?: string
  /** BTC only */
  href?: string
  chainID?: number
  siteName: string
}

interface ToolsSupportWebsite {
  pathname: string
  chain: string
}

interface EtherscanDethSupportWebsite {
  chain: string
  scanHrefPrefix: string
}

export const EXT_SUPPORT_WEB_LIST: ExtSupportWebsite[] = [
  {
    name: 'BTC',
    domains: ['btc.com', 'explorer.btc.com'],
    href: 'https://explorer.btc.com/btc',
    chain: 'btc',
    siteName: 'SCAN'
  },
  {
    name: 'ETH',
    domains: ['etherscan.io', 'cn.etherscan.com'],
    chainID: 1,
    chain: 'eth',
    siteName: 'SCAN'
  },
  {
    name: 'BSC',
    chainID: 56,
    domains: ['bscscan.com', 'www.bscscan.com'],
    chain: 'bsc',
    siteName: 'SCAN'
  },
  {
    name: 'Polygon',
    chainID: 137,
    chain: 'polygon',
    domains: ['polygonscan.com'],
    siteName: 'SCAN'
  },
  {
    name: 'Fantom',
    domains: ['ftmscan.com'],
    chain: 'fantom',
    chainID: 250,
    siteName: 'SCAN'
  },
  {
    name: 'Arbitrum',
    domains: ['arbiscan.io'],
    chain: 'arbitrum',
    chainID: 42161,
    siteName: 'SCAN'
  },
  {
    name: 'Cronos',
    chainID: 25,
    domains: ['cronoscan.com'],
    chain: 'cronos',
    siteName: 'SCAN'
  },
  {
    name: 'Moonbeam',
    chainID: 1284,
    chain: 'moonbeam',
    domains: ['moonscan.io', 'www.moonscan.io'],
    siteName: 'SCAN'
  },
  {
    name: 'Avalanche',
    chainID: 43114,
    chain: 'avalanche',
    domains: ['snowtrace.io'],
    siteName: 'SCAN'
  },
  {
    name: 'Optimism',
    chainID: 10,
    chain: 'optimism',
    domains: ['optimistic.etherscan.io'],
    siteName: 'SCAN'
  },
  {
    name: 'OpenSea',
    domains: ['opensea.io'],
    siteName: 'OPENSEA'
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

export const ETHERSCAN_DETH_SUPPORT_LIST: EtherscanDethSupportWebsite[] = [
  {
    chain: 'eth',
    scanHrefPrefix: 'https://etherscan.deth.net/address'
  },
  {
    chain: 'bsc',
    scanHrefPrefix: 'https://bscscan.deth.net/address'
  },
  {
    chain: 'polygon',
    scanHrefPrefix: 'https://polygonscan.deth.net/address'
  },
  {
    chain: 'fantom',
    scanHrefPrefix: 'https://ftmscan.deth.net/address'
  },
  {
    chain: 'optimism',
    scanHrefPrefix: 'https://optimistic.etherscan.deth.net/address'
  },
  {
    chain: 'arbitrum',
    scanHrefPrefix: 'https://arbiscan.deth.net/address'
  },
  {
    chain: 'avalanche',
    scanHrefPrefix: 'https://snowtrace.deth.net/address'
  },
  {
    chain: 'cronos',
    scanHrefPrefix: 'https://cronoscan.deth.net/address'
  }
]

/** https://ethervm.io */
export const ETHERVM_SUPPORT_DIRECT_LIST: string[] = ['eth', 'bsc']
