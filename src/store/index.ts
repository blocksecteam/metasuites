import { ChromeStorage } from 'chrome-extension-core'

import { SCOPE, EXT_SUPPORT_WEB_LIST } from '@common/constants'

/**
 * current support options
 */
const OPTIONS = [
  'supportWebList',
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
  'nftCollectionRisk',
  'nftOwnersLabel',
  'nftRarity',
  'nftFloorPrice',
  'addressFunderLabel',
  'quick2NFTGo',
  'decompileInEthervm',
  'exportTableData',
  'alternativeBlockExplorers',
  'approvalDiagnosis',
  'enhancedFortaLabels',
  'txnFortaAlert',
  'privateVariables',
  'formatContractParams',
  'tokenMarketplaces',
  'txSummary',
  'proxyLogs',
  'evmStorage',
  'txSimulator',
  'variableLogs'
] as const

export type OptKeys = (typeof OPTIONS)[number]

export interface OptWebsite extends Record<string, unknown> {
  name: string
  domains: string[]
  enabled: boolean
}

export type Options = {
  [key in OptKeys]: key extends 'supportWebList' ? OptWebsite[] : boolean
}

export type StorageInfo = {
  options: Options
}

export const defaultValue: StorageInfo = {
  /** default settings */
  options: {
    supportWebList: EXT_SUPPORT_WEB_LIST.map(item => ({
      ...item,
      enabled: true
    })),
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
    nftCollectionRisk: true,
    nftOwnersLabel: true,
    nftRarity: true,
    nftFloorPrice: true,
    addressFunderLabel: true,
    quick2NFTGo: true,
    decompileInEthervm: true,
    exportTableData: true,
    alternativeBlockExplorers: true,
    approvalDiagnosis: true,
    enhancedFortaLabels: true,
    txnFortaAlert: true,
    privateVariables: true,
    formatContractParams: true,
    tokenMarketplaces: true,
    txSummary: true,
    proxyLogs: true,
    evmStorage: true,
    txSimulator: true,
    variableLogs: true
  }
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
