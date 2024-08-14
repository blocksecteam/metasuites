import { uniq } from 'lodash-es'
import URLMatchPattern from '@remusao/url-match-patterns'

import type { OptWebsite } from '@src/store'
import {
  DEDAUB_SUPPORT_DIRECT_LIST,
  PHALCON_SUPPORT_LIST,
  TENDERLY_SUPPORT_LIST,
  OPENCHAIN_SUPPORT_LIST,
  ETHERVM_SUPPORT_DIRECT_LIST
} from '@common/constants'

export const isMatchURL = (url: string, patternList: string[]) => {
  return patternList.some(pattern => {
    return URLMatchPattern(pattern, url)
  })
}

/** judge from supportWebList */
export const isAllowed = (supportWebList: OptWebsite[]): boolean => {
  return supportWebList
    .filter(item => item.enabled)
    .map(item => ({
      ...item,
      domains: uniq([
        ...item.domains,
        ...(item.testNets?.map(i => i.domains) ?? []).flat()
      ])
    }))
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

export const isSupportEthervm = (chain: string) => {
  return (
    ETHERVM_SUPPORT_DIRECT_LIST.findIndex(item => item.chain === chain) !== -1
  )
}
