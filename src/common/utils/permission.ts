import type { OptWebsite } from '@src/store'
import {
  DEDAUB_SUPPORT_DIRECT_LIST,
  PHALCON_SUPPORT_LIST,
  TENDERLY_SUPPORT_LIST,
  OPENCHAIN_SUPPORT_LIST,
  TX_EXPLAIN_SUPPORT_LIST,
  EVM_STORAGE_SUPPORT_LIST
} from '@common/constants'

/** judge from supportWebList */
export const isAllowed = (supportWebList: OptWebsite[]): boolean => {
  // TODO: There is a bug in getting store data, and there will be duplicate items.
  const _supportWebList = [...supportWebList]
  const map = new Map()
  for (const item of supportWebList) {
    const name = item.name
    if (!map.has(name)) {
      map.set(name, item)
    } else {
      _supportWebList.splice(map.get(name).index, 1)
    }
  }
  return _supportWebList
    .filter(item => item.enabled)
    .map(item => item.domains)
    .flat()
    .some(item => window.location.host === item)
}

export const isSupportPhalcon = (chain: string): boolean => {
  return PHALCON_SUPPORT_LIST.findIndex(item => item.chain === chain) !== -1
}

export const isSupportTenderly = (chain: string): boolean => {
  return TENDERLY_SUPPORT_LIST.findIndex(item => item.chain === chain) !== -1
}

export const isSupportOpenchain = (chain: string): boolean => {
  return OPENCHAIN_SUPPORT_LIST.findIndex(item => item.chain === chain) !== -1
}

export const isSupportDedaub = (chain: string): boolean => {
  return (
    DEDAUB_SUPPORT_DIRECT_LIST.findIndex(item => item.chain === chain) !== -1
  )
}

export const isSupportParsers = (chain: string): boolean => {
  return (
    isSupportDedaub(chain) ||
    isSupportTenderly(chain) ||
    isSupportPhalcon(chain) ||
    isSupportOpenchain(chain)
  )
}

export const isSupportSimulator = (chain: string) => {
  return !!PHALCON_SUPPORT_LIST.find(item => item.chain === chain)
    ?.supportSimulator
}

export const isSupportTxExplain = (chain: string) => {
  return TX_EXPLAIN_SUPPORT_LIST.findIndex(item => item === chain) !== -1
}

export const isSupportEvmStorage = (chain: string) => {
  return EVM_STORAGE_SUPPORT_LIST.findIndex(item => item === chain) !== -1
}
