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
  'txSimulator',
  'variableLogs',
  'enablePrivateLabels'
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
    txSimulator: true,
    variableLogs: true,
    enablePrivateLabels: true
  },
  alternativeParsers: {
    [TransactionParsers.OPENCHAIN.name()]: true,
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
