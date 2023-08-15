import type { OptWebsite } from '@src/store'
import {
  PHALCON_SUPPORT_LIST,
  TENDERLY_SUPPORT_LIST,
  TRANSACTION_VIEWER_SUPPORT_LIST,
  TX_EXPLAIN_SUPPORT_LIST
} from '@common/constants'

/** judge from supportWebList */
export const isAllowed = (supportWebList: OptWebsite[]): boolean => {
  return (supportWebList as OptWebsite[])
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

export const isSupportTransactionViewer = (chain: string): boolean => {
  return (
    TRANSACTION_VIEWER_SUPPORT_LIST.findIndex(item => item.chain === chain) !==
    -1
  )
}

export const isSupportParsers = (chain: string): boolean => {
  return (
    isSupportTenderly(chain) ||
    isSupportPhalcon(chain) ||
    isSupportTransactionViewer(chain)
  )
}

export const isSupportSimulator = (chain: string) => {
  return !!PHALCON_SUPPORT_LIST.find(item => item.chain === chain)
    ?.supportSimulator
}

export const isSupportTxExplain = (chain: string) => {
  return TX_EXPLAIN_SUPPORT_LIST.findIndex(item => item === chain) !== -1
}
