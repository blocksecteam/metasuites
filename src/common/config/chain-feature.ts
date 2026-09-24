import { CHAIN_FEATURE_MAP } from './chain-feature-map'

export interface NativeCurrency {
  name: string
  symbol: string
  decimals: number
}

/**
 * Every chain-gated feature, mapped to the extra data it carries.
 * `true` means the feature is a plain on/off switch for that chain.
 */
export interface FeatureMetaMap {
  approvalDiagnosis: true
  /** Reverse lookup only: Arkham's own chain name -> our chain key */
  arkhamPhalcon: { arkhamName: string }
  debank: true
  dedaub: { pathname: string }
  dethCode: { url: string }
  ethervm: { url: string }
  fundFlow: true
  metasleuth: true
  phalcon: { pathname: string }
  proxyLog: true
  /** Network metadata shown in the simulation drawer */
  simulationNetwork: {
    name: string
    logo: string
    nativeCurrency: NativeCurrency
  }
  tenderly: true
  txExplain: true
  txSimulator: true
  variableLog: true
}

export type FeatureKey = keyof FeatureMetaMap

type Entry<K extends FeatureKey> = { chain: string; meta: FeatureMetaMap[K] }

/** Chains declared in `CHAIN_FEATURE_MAP` */
export type ChainKey = keyof typeof CHAIN_FEATURE_MAP

/**
 * The map is stored per chain because adding a chain is the frequent edit,
 * while most lookups are per feature. Invert it once at module load so both
 * directions are cheap.
 */
const ENTRIES = (() => {
  const acc: Partial<Record<FeatureKey, { chain: string; meta: unknown }[]>> =
    {}
  for (const [chain, features] of Object.entries(CHAIN_FEATURE_MAP)) {
    for (const [feature, meta] of Object.entries(features)) {
      ;(acc[feature as FeatureKey] ??= []).push({ chain, meta })
    }
  }
  return acc
})()

/**
 * Single entry point for "does this chain support that feature".
 *
 * The underlying table is intentionally not exported: every consumer goes
 * through this class, so the storage layout can change without touching them.
 */
export class ChainFeature {
  static supports(feature: FeatureKey, chain?: string): boolean {
    if (!chain) return false
    return !!ENTRIES[feature]?.some(item => item.chain === chain)
  }

  /** True when the chain supports at least one of the given features */
  static supportsAny(features: FeatureKey[], chain?: string): boolean {
    return features.some(feature => ChainFeature.supports(feature, chain))
  }

  /** Extra data attached to the feature, `undefined` when unsupported */
  static metaOf<K extends FeatureKey>(
    feature: K,
    chain?: string
  ): FeatureMetaMap[K] | undefined {
    if (!chain) return undefined
    return ChainFeature.entriesOf(feature).find(item => item.chain === chain)
      ?.meta
  }

  /** Every chain supporting the feature, in declaration order */
  static chainsOf(feature: FeatureKey): string[] {
    return ChainFeature.entriesOf(feature).map(item => item.chain)
  }

  /** Every chain supporting the feature, together with its meta */
  static entriesOf<K extends FeatureKey>(feature: K): Entry<K>[] {
    return (ENTRIES[feature] ?? []) as Entry<K>[]
  }

  /**
   * Arkham exposes its own chain names, so it needs a reverse lookup. The
   * match is case-insensitive because Arkham has rendered the same name both
   * upper case and capitalised across redesigns.
   */
  static chainByArkhamName(arkhamName: string): string | undefined {
    const name = arkhamName.trim().toLowerCase()
    if (!name) return undefined
    return ChainFeature.entriesOf('arkhamPhalcon').find(
      item => item.meta.arkhamName.toLowerCase() === name
    )?.chain
  }
}
