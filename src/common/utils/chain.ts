import {
  EXT_SUPPORT_WEB_LIST,
  DEFAULT_CHAIN_ICON,
  PATTERN_EVM_ADDRESS_EXAC,
  PATTERN_SOLANA_ADDRESS_EXAC,
  PATTERN_BTC_ADDRESS_EXAC,
  PATTERN_TRX_ADDRESS_EXAC,
  ChainType
} from '@common/constants'

export class ChainUtils {
  static getChainLogo(chain: string, defaultIcon = DEFAULT_CHAIN_ICON) {
    return (
      EXT_SUPPORT_WEB_LIST.flatMap(item => [
        item,
        ...(item.testNets || [])
      ]).find(item => item.chain === chain)?.logo ?? defaultIcon
    )
  }

  static getChainId(chain: string) {
    return EXT_SUPPORT_WEB_LIST.flatMap(item => [
      item,
      ...(item.testNets || [])
    ]).find(item => item.chain === chain)?.chainID
  }

  static getCurrentChain() {
    const host = window.location.host
    return EXT_SUPPORT_WEB_LIST.flatMap(item => [
      item,
      ...(item.testNets || [])
    ]).find(item => item.domains.some(i => host === i))?.chain
  }

  /**
   * Determine the chain type based on the address
   * @param address The address to analyze
   * @returns The determined chain type
   */
  static getChainTypeFromAddress(address: string): ChainType {
    // Check exact patterns first
    if (PATTERN_EVM_ADDRESS_EXAC.test(address)) {
      return ChainType.EVM
    }
    if (PATTERN_SOLANA_ADDRESS_EXAC.test(address)) {
      return ChainType.SOLANA
    }
    if (PATTERN_BTC_ADDRESS_EXAC.test(address)) {
      return ChainType.BTC
    }
    if (PATTERN_TRX_ADDRESS_EXAC.test(address)) {
      return ChainType.TRON
    }

    // For addresses that don't match exact patterns, try some heuristics
    if (address.startsWith('0x') || address.startsWith('0X')) {
      return ChainType.EVM
    }
    if (address.startsWith('T') && address.length === 34) {
      return ChainType.TRON
    }
    if (
      !address.startsWith('0x') &&
      address.length >= 32 &&
      address.length <= 44
    ) {
      // Base58 encoded addresses of appropriate length, likely Solana
      return ChainType.SOLANA
    }
    if (
      address.startsWith('1') ||
      address.startsWith('3') ||
      address.startsWith('bc1')
    ) {
      return ChainType.BTC
    }

    // Default to unknown if no patterns match
    return ChainType.UNKNOWN
  }
}

export const classifyByChain = (chain: string): ChainType => {
  const chainList = EXT_SUPPORT_WEB_LIST.flatMap(item => [
    item,
    ...(item.testNets || [])
  ])
    .map(item => item.chain)
    .filter(i => !!i)
  if (chain === 'tron') {
    return ChainType.TRON
  } else if (chain === 'solana') {
    return ChainType.SOLANA
  } else if (chain === 'btc') {
    return ChainType.BTC
  } else if (chainList.includes(chain)) {
    return ChainType.EVM
  }
  return ChainType.UNKNOWN
}

/**
 * Determine the chain type based on the address
 * @param address The address to analyze
 * @returns The determined chain type
 */
export const getChainTypeFromAddress = (address: string): ChainType => {
  return ChainUtils.getChainTypeFromAddress(address)
}
