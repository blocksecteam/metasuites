import { EXT_SUPPORT_WEB_LIST } from '@common/constants/support'
import { DEFAULT_CHAIN_ICON, ChainType } from '@common/constants'

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
