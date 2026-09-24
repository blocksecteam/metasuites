import { describe, expect, test } from 'vitest'
import { ChainFeature, type FeatureKey } from '@common/config/chain-feature'
import { CHAIN_FEATURE_MAP } from '@common/config/chain-feature-map'
import { EXT_SUPPORT_WEB_LIST } from '@common/constants/support'

/**
 * Behaviour snapshot of the chain gating tables, captured before the storage
 * layout was reorganised. These literals are intentionally hard-coded: they are
 * the contract that any change to the underlying tables must keep, so never
 * regenerate them from the source data — update them only together with a
 * deliberate, reviewed change to which chains support which feature.
 */
const SUPPORTED_CHAINS: Record<FeatureKey, string[]> = {
  approvalDiagnosis: [
    'arbitrum',
    'avalanche',
    'base',
    'bsc',
    'btt',
    'celo',
    'cronos',
    'eth',
    'fantom',
    'gnosis',
    'linea',
    'mantle',
    'moonbeam',
    'moonriver',
    'optimism',
    'polygon',
    'sonic',
    'tron',
    'wemix',
    'zkevm'
  ],
  arkhamPhalcon: ['arbitrum', 'avalanche', 'base', 'eth', 'polygon'],
  debank: [
    'arbitrum',
    'avalanche',
    'base',
    'bsc',
    'btt',
    'celo',
    'cronos',
    'era.zksync',
    'eth',
    'fantom',
    'gnosis',
    'linea',
    'mantle',
    'moonbeam',
    'moonriver',
    'nova.arbitrum',
    'optimism',
    'polygon',
    'sonic',
    'wemix',
    'zkevm'
  ],
  dedaub: [
    'arbitrum',
    'avalanche',
    'base',
    'bsc',
    'eth',
    'fantom',
    'gnosis',
    'optimism',
    'polygon'
  ],
  dethCode: [
    'arbitrum',
    'avalanche',
    'base',
    'bsc',
    'cronos',
    'eth',
    'fantom',
    'optimism',
    'polygon'
  ],
  ethervm: ['bsc', 'eth', 'sepolia.eth', 'tron'],
  fundFlow: [
    'alfa.celo',
    'arbitrum',
    'avalanche',
    'base',
    'bsc',
    'btc',
    'btt',
    'celo',
    'cronos',
    'era.zksync',
    'eth',
    'fantom',
    'gnosis',
    'linea',
    'mantle',
    'megaeth',
    'merlin',
    'monad',
    'moonbase',
    'moonbeam',
    'moonriver',
    'mumbai.polygon',
    'nova.arbitrum',
    'optimism',
    'polygon',
    'sepolia.eth',
    'solana',
    'sonic',
    'test.bsc',
    'test.btt',
    'test.fantom',
    'test.monad',
    'test.op',
    'test.wemix',
    'test.zkevm',
    'tron',
    'wemix',
    'zkevm'
  ],
  metasleuth: [
    'arbitrum',
    'avalanche',
    'base',
    'bsc',
    'eth',
    'linea',
    'mantle',
    'optimism',
    'polygon',
    'solana',
    'tron'
  ],
  phalcon: [
    'arbitrum',
    'avalanche',
    'base',
    'bsc',
    'eth',
    'linea',
    'mantle',
    'megaeth',
    'monad',
    'optimism',
    'polygon',
    'robinhood',
    'sepolia.eth',
    'solana'
  ],
  proxyLog: [
    'arbitrum',
    'avalanche',
    'bsc',
    'cronos',
    'eth',
    'fantom',
    'moonbeam',
    'optimism',
    'polygon'
  ],
  simulationNetwork: [
    'arbitrum',
    'avalanche',
    'bsc',
    'eth',
    'fantom',
    'mantle',
    'megaeth',
    'optimism',
    'polygon'
  ],
  tenderly: [
    'arbitrum',
    'avalanche',
    'base',
    'bsc',
    'cronos',
    'eth',
    'fantom',
    'gnosis',
    'mantle',
    'monad',
    'moonbeam',
    'moonriver',
    'mumbai.polygon',
    'nova.arbitrum',
    'optimism',
    'polygon',
    'robinhood',
    'sepolia.eth',
    'sonic',
    'test.fantom',
    'test.monad'
  ],
  txExplain: ['eth'],
  txSimulator: [
    'arbitrum',
    'avalanche',
    'bsc',
    'eth',
    'mantle',
    'megaeth',
    'optimism'
  ],
  variableLog: ['arbitrum', 'avalanche', 'bsc', 'eth', 'optimism', 'polygon']
}

const META: Partial<Record<FeatureKey, Record<string, unknown>>> = {
  arkhamPhalcon: {
    eth: { arkhamName: 'ETHEREUM' },
    polygon: { arkhamName: 'POLYGON' },
    avalanche: { arkhamName: 'AVALANCHE' },
    arbitrum: { arkhamName: 'ARBITRUM' },
    base: { arkhamName: 'BASE' }
  },
  dedaub: {
    eth: { pathname: 'ethereum' },
    bsc: { pathname: 'binance' },
    fantom: { pathname: 'fantom' },
    arbitrum: { pathname: 'arbitrum' },
    optimism: { pathname: 'optimism' },
    polygon: { pathname: 'polygon' },
    avalanche: { pathname: 'avalanche' },
    base: { pathname: 'base' },
    gnosis: { pathname: 'gnosis' }
  },
  dethCode: {
    eth: { url: 'https://etherscan.deth.net/address' },
    bsc: { url: 'https://bscscan.deth.net/address' },
    polygon: { url: 'https://polygonscan.deth.net/address' },
    fantom: { url: 'https://ftmscan.deth.net/address' },
    optimism: { url: 'https://optimistic.etherscan.deth.net/address' },
    arbitrum: { url: 'https://arbiscan.deth.net/address' },
    avalanche: { url: 'https://snowtrace.deth.net/address' },
    cronos: { url: 'https://cronoscan.deth.net/address' },
    base: { url: 'https://basescan.deth.net/address' }
  },
  ethervm: {
    eth: { url: 'https://ethervm.io/decompile' },
    bsc: { url: 'https://ethervm.io/decompile/binance' },
    'sepolia.eth': { url: 'https://ethervm.io/decompile/sepolia' },
    tron: { url: 'https://ethervm.io/decompile/tron' }
  },
  phalcon: {
    eth: { pathname: 'eth' },
    'sepolia.eth': { pathname: 'sepolia' },
    polygon: { pathname: 'polygon' },
    bsc: { pathname: 'bsc' },
    avalanche: { pathname: 'avalanche' },
    arbitrum: { pathname: 'arbitrum' },
    optimism: { pathname: 'optimism' },
    linea: { pathname: 'linea' },
    base: { pathname: 'base' },
    solana: { pathname: 'solana' },
    mantle: { pathname: 'mantle' },
    monad: { pathname: 'monad' },
    megaeth: { pathname: 'megaeth' },
    robinhood: { pathname: 'robinhood' }
  },
  simulationNetwork: {
    eth: {
      name: 'ETH',
      logo: 'https://assets.blocksec.com/image/1671685360787-7.png',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
    },
    bsc: {
      name: 'BSC',
      logo: 'https://assets.blocksec.com/image/1671685360787-4.png',
      nativeCurrency: { decimals: 18, name: 'BNB', symbol: 'BNB' }
    },
    polygon: {
      name: 'Polygon',
      logo: 'https://assets.blocksec.com/image/1671685360787-12.png',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 }
    },
    fantom: {
      name: 'Fantom',
      logo: 'https://assets.blocksec.com/image/1671685360787-8.png',
      nativeCurrency: { decimals: 18, name: 'Fantom', symbol: 'FTM' }
    },
    arbitrum: {
      name: 'Arbitrum',
      logo: 'https://assets.blocksec.com/image/1671685360787-2.png',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
    },
    avalanche: {
      name: 'Avalanche',
      logo: 'https://assets.blocksec.com/image/1671777583236-3.png',
      nativeCurrency: { decimals: 18, name: 'Avalanche', symbol: 'AVAX' }
    },
    optimism: {
      name: 'Optimism',
      logo: 'https://assets.blocksec.com/image/1671777583236-2.png',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
    },
    mantle: {
      name: 'Mantle',
      logo: 'https://assets.blocksec.com/image/1721387994429-2.svg',
      nativeCurrency: { decimals: 18, name: 'MNT', symbol: 'MNT' }
    },
    megaeth: {
      name: 'MegaETH',
      logo: 'https://assets.blocksec.com/image/1769410070519-5.svg',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
    }
  }
}

const KNOWN_CHAINS = [
  'btc',
  'eth',
  'sepolia.eth',
  'bsc',
  'test.bsc',
  'test.op',
  'polygon',
  'mumbai.polygon',
  'fantom',
  'test.fantom',
  'arbitrum',
  'cronos',
  'moonbeam',
  'moonbase',
  'avalanche',
  'optimism',
  'nova.arbitrum',
  'moonriver',
  'btt',
  'test.btt',
  'celo',
  'alfa.celo',
  'gnosis',
  'base',
  'zkevm',
  'test.zkevm',
  'linea',
  'wemix',
  'test.wemix',
  'tron',
  'era.zksync',
  'merlin',
  'mantle',
  'sonic',
  'monad',
  'test.monad',
  'solana',
  'megaeth',
  'robinhood'
]

const FEATURES = Object.keys(SUPPORTED_CHAINS) as FeatureKey[]

describe('ChainFeature', () => {
  test.each(FEATURES)('chainsOf(%s) matches the snapshot', feature => {
    expect([...ChainFeature.chainsOf(feature)].sort()).toEqual(
      SUPPORTED_CHAINS[feature]
    )
  })

  test.each(FEATURES)('supports(%s) matches the snapshot', feature => {
    const actual = KNOWN_CHAINS.filter(chain =>
      ChainFeature.supports(feature, chain)
    ).sort()
    expect(actual).toEqual(SUPPORTED_CHAINS[feature])
  })

  test.each(Object.keys(META) as FeatureKey[])(
    'metaOf(%s) matches the snapshot',
    feature => {
      const expected = META[feature]!
      const actual = Object.fromEntries(
        ChainFeature.entriesOf(feature).map(item => [item.chain, item.meta])
      )
      expect(actual).toEqual(expected)
    }
  )

  test('unsupported and empty chains are rejected', () => {
    expect(ChainFeature.supports('phalcon', 'not-a-chain')).toBe(false)
    expect(ChainFeature.supports('phalcon', undefined)).toBe(false)
    expect(ChainFeature.supports('phalcon', '')).toBe(false)
    expect(ChainFeature.metaOf('phalcon', 'not-a-chain')).toBeUndefined()
  })

  test('supportsAny reflects any of the given features', () => {
    expect(ChainFeature.supportsAny(['phalcon', 'tenderly'], 'eth')).toBe(true)
    expect(ChainFeature.supportsAny(['txExplain'], 'bsc')).toBe(false)
  })

  test('chainByArkhamName resolves Arkham chain names', () => {
    expect(ChainFeature.chainByArkhamName('ETHEREUM')).toBe('eth')
    expect(ChainFeature.chainByArkhamName('NOPE')).toBeUndefined()
  })

  test('chainByArkhamName ignores case and surrounding spaces', () => {
    expect(ChainFeature.chainByArkhamName('Ethereum')).toBe('eth')
    expect(ChainFeature.chainByArkhamName('  arbitrum ')).toBe('arbitrum')
    expect(ChainFeature.chainByArkhamName('')).toBeUndefined()
  })
})

describe('CHAIN_FEATURE_MAP', () => {
  const knownChains = [
    ...new Set(
      EXT_SUPPORT_WEB_LIST.flatMap(item => [item, ...(item.testNets ?? [])])
        .map(item => item.chain)
        .filter((chain): chain is string => !!chain)
    )
  ]

  test('declares every chain the extension knows about', () => {
    const missing = knownChains.filter(chain => !(chain in CHAIN_FEATURE_MAP))
    expect(missing).toEqual([])
  })

  test('declares no chain the extension does not know about', () => {
    const unknown = Object.keys(CHAIN_FEATURE_MAP).filter(
      chain => !knownChains.includes(chain)
    )
    expect(unknown).toEqual([])
  })

  test('keeps the order of the simulation drawer network list', () => {
    // This is the only place where entry order reaches the UI
    expect(ChainFeature.chainsOf('simulationNetwork')).toEqual([
      'eth',
      'bsc',
      'polygon',
      'fantom',
      'arbitrum',
      'avalanche',
      'optimism',
      'mantle',
      'megaeth'
    ])
  })
})
