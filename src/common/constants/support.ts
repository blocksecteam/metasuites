/**
 * TODO: Will be removed in the future, please use `FeatureActiveSupport`
 */

import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'

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
    domains: ['explorer.cloverpool.com'],
    href: 'https://explorer.cloverpool.com/btc',
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
    logo: 'https://assets.blocksec.com/image/1730112854227-2.svg',
    testNets: [
      {
        name: 'Sepolia',
        domains: ['sepolia.etherscan.io'],
        chainID: 11_155_111,
        chain: 'sepolia.eth',
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1671685360787-7.png'
      }
    ]
  },
  {
    name: 'ETH (Blockscout)',
    domains: ['eth.blockscout.com'],
    chainID: 1,
    chain: 'eth',
    siteName: 'BLOCKSCOUT',
    logo: 'https://raw.githubusercontent.com/blockscout/frontend-configs/main/configs/meta-suites-logos/ethereum.png',
    testNets: [
      {
        name: 'Sepolia (Blockscout)',
        domains: ['eth-sepolia.blockscout.com'],
        chainID: 11_155_111,
        chain: 'sepolia.eth',
        siteName: 'BLOCKSCOUT',
        logo: 'https://raw.githubusercontent.com/blockscout/frontend-configs/main/configs/meta-suites-logos/ethereum.png'
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
    name: 'Polygon (Blockscout)',
    chainID: 137,
    chain: 'polygon',
    domains: ['polygon.blockscout.com'],
    siteName: 'BLOCKSCOUT',
    logo: 'https://raw.githubusercontent.com/blockscout/frontend-configs/main/configs/meta-suites-logos/polygon.png'
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
    logo: 'https://assets.blocksec.com/image/1671685360787-2.png'
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
    domains: ['snowscan.xyz'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671777583236-3.png'
  },
  {
    name: 'Optimism',
    chainID: 10,
    chain: 'optimism',
    domains: ['optimistic.etherscan.io'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1671777583236-2.png'
  },
  {
    name: 'Optimism (Blockscout)',
    chainID: 10,
    chain: 'optimism',
    domains: ['optimism.blockscout.com'],
    siteName: 'BLOCKSCOUT',
    logo: 'https://raw.githubusercontent.com/blockscout/frontend-configs/main/configs/meta-suites-logos/optimism.png'
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
    name: 'Gnosis (Blockscout)',
    chainID: 100,
    chain: 'gnosis',
    domains: ['gnosis.blockscout.com'],
    siteName: 'BLOCKSCOUT',
    logo: 'https://raw.githubusercontent.com/blockscout/frontend-configs/main/configs/meta-suites-logos/gnosis.png'
  },
  {
    name: 'Base',
    chainID: 8453,
    chain: 'base',
    domains: ['basescan.org'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197286815-2.png'
  },
  {
    name: 'Base (Blockscout)',
    chainID: 8453,
    chain: 'base',
    domains: ['base.blockscout.com'],
    siteName: 'BLOCKSCOUT',
    logo: 'https://raw.githubusercontent.com/blockscout/frontend-configs/main/configs/meta-suites-logos/base.png'
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
    name: 'Polygon zkEVM (Blockscout)',
    chainID: 1101,
    chain: 'zkevm',
    domains: ['zkevm.blockscout.com'],
    siteName: 'BLOCKSCOUT',
    logo: 'https://raw.githubusercontent.com/blockscout/frontend-configs/main/configs/meta-suites-logos/polygon_zk-evm.png'
  },
  {
    name: 'Linea',
    chainID: 59_144,
    chain: 'linea',
    domains: ['lineascan.build'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1695197286815-4.png'
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
  },
  {
    name: 'zkSync Era (Blockscout)',
    chain: 'era.zksync',
    domains: ['zksync.blockscout.com'],
    siteName: 'BLOCKSCOUT',
    logo: 'https://raw.githubusercontent.com/blockscout/frontend-configs/main/configs/meta-suites-logos/zk-sync.png'
  },
  {
    name: 'MerlinScan',
    chain: 'merlin',
    domains: ['scan.merlinchain.io'],
    siteName: 'MERLINSCAN',
    logo: 'https://assets.blocksec.com/image/1711950037081-2.png'
  },
  {
    name: 'MantleScan',
    chain: 'mantle',
    domains: ['mantlescan.xyz'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1721387994429-2.svg'
  },
  {
    name: 'SonicScan',
    chain: 'sonic',
    domains: ['sonicscan.org'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1741083037784-2.svg'
  },
  {
    name: 'Monad',
    chainID: 143,
    chain: 'monad',
    domains: ['monadscan.com', 'www.monadscan.com'],
    siteName: 'ETHERSCAN',
    logo: 'https://assets.blocksec.com/image/1765762604324/monad.svg',
    testNets: [
      {
        name: 'Monad Testnet',
        chainID: 10143,
        chain: 'test.monad',
        domains: ['testnet.monadscan.com'],
        siteName: 'ETHERSCAN',
        logo: 'https://assets.blocksec.com/image/1756956187260/monad-testnet.svg'
      }
    ]
  },
  {
    name: 'Solscan',
    chain: 'solana',
    domains: ['solscan.io'],
    siteName: 'SOLSCAN',
    logo: 'https://assets.blocksec.com/image/1716447208502-2.svg'
  },
  {
    name: 'SolanaFM',
    chain: 'solana',
    domains: ['solana.fm'],
    siteName: 'SOLANAFM',
    logo: 'https://assets.blocksec.com/image/1716447208502-2.svg'
  },
  {
    name: 'Solana Explorer',
    chain: 'solana',
    domains: ['explorer.solana.com'],
    siteName: 'SOLANAEXPL',
    logo: 'https://assets.blocksec.com/image/1716447208502-2.svg'
  },
  {
    name: 'Debank',
    domains: ['debank.com'],
    siteName: 'DEBANK',
    logo: 'https://assets.blocksec.com/image/1716165286476-3.svg'
  },
  {
    name: 'Arkham',
    domains: ['intel.arkm.com'],
    siteName: 'ARKHAM',
    logo: 'https://assets.blocksec.com/image/1716165286476-2.svg'
  },
  {
    name: 'DEX Screener',
    domains: ['dexscreener.com'],
    siteName: 'DEX',
    logo: 'https://assets.blocksec.com/image/1716165286476-4.svg'
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
  'tron',
  'solana',
  'mantle'
]

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
    pathname: 'polygon',
    chain: 'polygon',
    supportSimulator: false
  },
  {
    pathname: 'bsc',
    chain: 'bsc',
    supportSimulator: true
  },
  {
    pathname: 'avalanche',
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
    pathname: 'fantom',
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
  },
  {
    pathname: 'solana',
    chain: 'solana',
    supportSimulator: false
  },
  {
    pathname: 'mantle',
    chain: 'mantle',
    supportSimulator: true
  },
  {
    pathname: 'sonic',
    chain: 'sonic',
    supportSimulator: false
  },
  {
    pathname: 'monad',
    chain: 'monad',
    supportSimulator: false
  },
  {
    pathname: 'monad-testnet',
    chain: 'test.monad',
    supportSimulator: false
  }
]

export const TENDERLY_SUPPORT_LIST = [
  'polygon',
  'bsc',
  'arbitrum',
  'fantom',
  'avalanche',
  'eth',
  'optimism',
  'base',
  'cronos',
  'moonbeam',
  'moonriver',
  'gnosis',
  'test.fantom',
  'mumbai.polygon',
  'sepolia.eth',
  'nova.arbitrum',
  'mantle',
  'sonic',
  'monad',
  'test.monad'
]

/** https://app.dedaub.com/ */
export const DEDAUB_SUPPORT_DIRECT_LIST = [
  {
    chain: 'eth',
    pathname: 'ethereum'
  },
  {
    chain: 'bsc',
    pathname: 'binance'
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
    chain: 'optimism',
    pathname: 'optimism'
  },
  {
    chain: 'polygon',
    pathname: 'polygon'
  },
  {
    chain: 'avalanche',
    pathname: 'avalanche'
  },
  {
    chain: 'base',
    pathname: 'base'
  },
  {
    chain: 'gnosis',
    pathname: 'gnosis'
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
  },
  {
    chain: 'base',
    url: 'https://basescan.deth.net/address'
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
  },
  {
    name: 'Mantle',
    chain: 'mantle',
    logo: 'https://assets.blocksec.com/image/1721387994429-2.svg',
    nativeCurrency: {
      decimals: 18,
      name: 'MNT',
      symbol: 'MNT'
    }
  }
]

export const TX_EXPLAIN_SUPPORT_LIST = ['eth']

export const EVM_STORAGE_SUPPORT_LIST = ['eth']

export class TransactionParsers extends BaseConstant {
  static PHALCON = new BaseConstant(
    'phalcon',
    'phalcon',
    PHALCON_EXPLORER_DOMAIN
  )
  static TENDERLY = new BaseConstant(
    'tenderly',
    'tenderly',
    'https://dashboard.tenderly.co'
  )
  static DEDAUB = new BaseConstant('dedaub', 'dedaub', 'https://app.dedaub.com')
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
  'era.zksync',
  'mantle',
  'sonic'
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
  'tron',
  'mantle',
  'sonic'
]

export const ARKHAM_PHALCON_SUPPORTED_LIST = [
  {
    pathname: 'eth',
    chain: 'eth',
    name: 'ETHEREUM'
  },
  {
    pathname: 'polygon',
    chain: 'polygon',
    name: 'POLYGON'
  },
  {
    pathname: 'avalanche',
    chain: 'avalanche',
    name: 'AVALANCHE'
  },
  {
    pathname: 'arbitrum',
    chain: 'arbitrum',
    name: 'ARBITRUM'
  },
  {
    pathname: 'base',
    chain: 'base',
    name: 'BASE'
  }
]
