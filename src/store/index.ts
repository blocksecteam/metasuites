import { ChromeStorage } from 'chrome-extension-core'

import {
  SCOPE,
  EXT_SUPPORT_WEB_LIST,
  TransactionParsers,
  type ExtSupportWebsite,
  type ChainType
} from '@common/constants'

/**
 * current support options
 */
const OPTIONS = [
  'fundFlow',
  'enhancedSignatures',
  'complianceScores',
  'enhancedLabels',
  'quick2Parsers',
  'contractSourcecode',
  'quick2debank',
  'decompileInDedaub',
  'dedaubStorage',
  'utc2locale',
  'showCopyIcon',
  'dethCode',
  'addressFunderLabel',
  'decompileInEthervm',
  'exportTableData',
  'approvalDiagnosis',
  'privateVariables',
  'formatContractParams',
  'tokenMarketplaces',
  'txSummary',
  'proxyLogs',
  'txSimulator',
  'variableLogs',
  'enablePrivateLabels',
  'syncPhalconLabels',
  'hideZeroValueTransfers'
] as const

export type OptKeys = (typeof OPTIONS)[number]

export type Options = {
  [key in OptKeys]: boolean
}

export type OptWebsite = ExtSupportWebsite & { enabled: boolean }

export interface PrivateLabel {
  address: string
  label: string
  color?: string
  chainType: ChainType
  deleted?: boolean
  source?: string
}

export type StorageInfo = {
  supportWebList: {
    [key: ExtSupportWebsite['name']]: OptWebsite
  }
  options: Options
  alternativeParsers: Record<string, boolean>
  privateLabels: Record<string, PrivateLabel>
  token: string
}

export const defaultValue: StorageInfo = {
  supportWebList: EXT_SUPPORT_WEB_LIST.reduce((obj: any, item) => {
    obj[item.name] = { ...item, enabled: true }
    return obj
  }, {}),
  options: {
    fundFlow: true,
    enhancedSignatures: true,
    complianceScores: true,
    enhancedLabels: true,
    quick2Parsers: true,
    contractSourcecode: true,
    quick2debank: true,
    decompileInDedaub: true,
    dedaubStorage: true,
    utc2locale: false,
    showCopyIcon: true,
    dethCode: true,
    addressFunderLabel: true,
    decompileInEthervm: true,
    exportTableData: true,
    approvalDiagnosis: true,
    privateVariables: true,
    formatContractParams: true,
    tokenMarketplaces: true,
    txSummary: true,
    proxyLogs: true,
    txSimulator: true,
    variableLogs: true,
    enablePrivateLabels: true,
    syncPhalconLabels: true,
    hideZeroValueTransfers: true
  },
  alternativeParsers: {
    [TransactionParsers.TENDERLY.name()]: true,
    [TransactionParsers.DEDAUB.name()]: false
  },
  privateLabels: {},
  token: ''
}

/**
 * global storage scoped in extension
 */
export const store = new ChromeStorage<StorageInfo>(
  chrome.storage?.local,
  defaultValue,
  {
    scope: SCOPE
  }
)
