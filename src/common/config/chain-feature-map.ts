import type { FeatureMetaMap } from './chain-feature'

/**
 * Identity helper that type-checks the table against `FeatureMetaMap` while
 * keeping the literal chain keys (the pre-4.9 stand-in for `satisfies`).
 */
const defineChainFeatures = <T extends Record<string, Partial<FeatureMetaMap>>>(
  map: T
): T => map

/**
 * Which features each chain supports, and the data those features need.
 *
 * This is the single source of truth for chain gating: a feature that is not
 * listed for a chain is not available on that chain, so adding a chain here is
 * the only place where its feature coverage is declared.
 *
 * Not exported through `@common/constants` on purpose — every consumer goes
 * through the `ChainFeature` helper instead of reading this table directly.
 */
export const CHAIN_FEATURE_MAP = defineChainFeatures({
  btc: {
    fundFlow: true
  },
  eth: {
    approvalDiagnosis: true,
    arkhamPhalcon: { arkhamName: 'ETHEREUM' },
    debank: true,
    dedaub: { pathname: 'ethereum' },
    dethCode: { url: 'https://etherscan.deth.net/address' },
    ethervm: { url: 'https://ethervm.io/decompile' },
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'eth' },
    proxyLog: true,
    simulationNetwork: {
      name: 'ETH',
      logo: 'https://assets.blocksec.com/image/1671685360787-7.png',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
    },
    tenderly: true,
    txExplain: true,
    txSimulator: true,
    variableLog: true
  },
  'sepolia.eth': {
    ethervm: { url: 'https://ethervm.io/decompile/sepolia' },
    fundFlow: true,
    phalcon: { pathname: 'sepolia' },
    tenderly: true
  },
  bsc: {
    approvalDiagnosis: true,
    debank: true,
    dedaub: { pathname: 'binance' },
    dethCode: { url: 'https://bscscan.deth.net/address' },
    ethervm: { url: 'https://ethervm.io/decompile/binance' },
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'bsc' },
    proxyLog: true,
    simulationNetwork: {
      name: 'BSC',
      logo: 'https://assets.blocksec.com/image/1671685360787-4.png',
      nativeCurrency: { decimals: 18, name: 'BNB', symbol: 'BNB' }
    },
    tenderly: true,
    txSimulator: true,
    variableLog: true
  },
  'test.bsc': {
    fundFlow: true
  },
  'test.op': {
    fundFlow: true
  },
  polygon: {
    approvalDiagnosis: true,
    arkhamPhalcon: { arkhamName: 'POLYGON' },
    debank: true,
    dedaub: { pathname: 'polygon' },
    dethCode: { url: 'https://polygonscan.deth.net/address' },
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'polygon' },
    proxyLog: true,
    simulationNetwork: {
      name: 'Polygon',
      logo: 'https://assets.blocksec.com/image/1671685360787-12.png',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 }
    },
    tenderly: true,
    variableLog: true
  },
  'mumbai.polygon': {
    fundFlow: true,
    tenderly: true
  },
  fantom: {
    approvalDiagnosis: true,
    debank: true,
    dedaub: { pathname: 'fantom' },
    dethCode: { url: 'https://ftmscan.deth.net/address' },
    fundFlow: true,
    proxyLog: true,
    simulationNetwork: {
      name: 'Fantom',
      logo: 'https://assets.blocksec.com/image/1671685360787-8.png',
      nativeCurrency: { decimals: 18, name: 'Fantom', symbol: 'FTM' }
    },
    tenderly: true
  },
  'test.fantom': {
    fundFlow: true,
    tenderly: true
  },
  arbitrum: {
    approvalDiagnosis: true,
    arkhamPhalcon: { arkhamName: 'ARBITRUM' },
    debank: true,
    dedaub: { pathname: 'arbitrum' },
    dethCode: { url: 'https://arbiscan.deth.net/address' },
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'arbitrum' },
    proxyLog: true,
    simulationNetwork: {
      name: 'Arbitrum',
      logo: 'https://assets.blocksec.com/image/1671685360787-2.png',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
    },
    tenderly: true,
    txSimulator: true,
    variableLog: true
  },
  cronos: {
    approvalDiagnosis: true,
    debank: true,
    dethCode: { url: 'https://cronoscan.deth.net/address' },
    fundFlow: true,
    proxyLog: true,
    tenderly: true
  },
  moonbeam: {
    approvalDiagnosis: true,
    debank: true,
    fundFlow: true,
    proxyLog: true,
    tenderly: true
  },
  moonbase: {
    fundFlow: true
  },
  avalanche: {
    approvalDiagnosis: true,
    arkhamPhalcon: { arkhamName: 'AVALANCHE' },
    debank: true,
    dedaub: { pathname: 'avalanche' },
    dethCode: { url: 'https://snowtrace.deth.net/address' },
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'avalanche' },
    proxyLog: true,
    simulationNetwork: {
      name: 'Avalanche',
      logo: 'https://assets.blocksec.com/image/1671777583236-3.png',
      nativeCurrency: { decimals: 18, name: 'Avalanche', symbol: 'AVAX' }
    },
    tenderly: true,
    txSimulator: true,
    variableLog: true
  },
  optimism: {
    approvalDiagnosis: true,
    debank: true,
    dedaub: { pathname: 'optimism' },
    dethCode: { url: 'https://optimistic.etherscan.deth.net/address' },
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'optimism' },
    proxyLog: true,
    simulationNetwork: {
      name: 'Optimism',
      logo: 'https://assets.blocksec.com/image/1671777583236-2.png',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
    },
    tenderly: true,
    txSimulator: true,
    variableLog: true
  },
  'nova.arbitrum': {
    debank: true,
    fundFlow: true,
    tenderly: true
  },
  moonriver: {
    approvalDiagnosis: true,
    debank: true,
    fundFlow: true,
    tenderly: true
  },
  btt: {
    approvalDiagnosis: true,
    debank: true,
    fundFlow: true
  },
  'test.btt': {
    fundFlow: true
  },
  celo: {
    approvalDiagnosis: true,
    debank: true,
    fundFlow: true
  },
  'alfa.celo': {
    fundFlow: true
  },
  gnosis: {
    approvalDiagnosis: true,
    debank: true,
    dedaub: { pathname: 'gnosis' },
    fundFlow: true,
    tenderly: true
  },
  base: {
    approvalDiagnosis: true,
    arkhamPhalcon: { arkhamName: 'BASE' },
    debank: true,
    dedaub: { pathname: 'base' },
    dethCode: { url: 'https://basescan.deth.net/address' },
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'base' },
    tenderly: true
  },
  zkevm: {
    approvalDiagnosis: true,
    debank: true,
    fundFlow: true
  },
  'test.zkevm': {
    fundFlow: true
  },
  linea: {
    approvalDiagnosis: true,
    debank: true,
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'linea' }
  },
  wemix: {
    approvalDiagnosis: true,
    debank: true,
    fundFlow: true
  },
  'test.wemix': {
    fundFlow: true
  },
  tron: {
    approvalDiagnosis: true,
    ethervm: { url: 'https://ethervm.io/decompile/tron' },
    fundFlow: true,
    metasleuth: true
  },
  'era.zksync': {
    debank: true,
    fundFlow: true
  },
  merlin: {
    fundFlow: true
  },
  mantle: {
    approvalDiagnosis: true,
    debank: true,
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'mantle' },
    simulationNetwork: {
      name: 'Mantle',
      logo: 'https://assets.blocksec.com/image/1721387994429-2.svg',
      nativeCurrency: { decimals: 18, name: 'MNT', symbol: 'MNT' }
    },
    tenderly: true,
    txSimulator: true
  },
  sonic: {
    approvalDiagnosis: true,
    debank: true,
    fundFlow: true,
    tenderly: true
  },
  monad: {
    fundFlow: true,
    phalcon: { pathname: 'monad' },
    tenderly: true
  },
  'test.monad': {
    fundFlow: true,
    tenderly: true
  },
  solana: {
    fundFlow: true,
    metasleuth: true,
    phalcon: { pathname: 'solana' }
  },
  megaeth: {
    fundFlow: true,
    phalcon: { pathname: 'megaeth' },
    simulationNetwork: {
      name: 'MegaETH',
      logo: 'https://assets.blocksec.com/image/1769410070519-5.svg',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
    },
    txSimulator: true
  },
  robinhood: {
    phalcon: { pathname: 'robinhood' },
    tenderly: true
  }
})
