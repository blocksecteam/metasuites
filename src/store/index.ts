import { ChromeStorage } from 'chrome-extension-core'

import { SCOPE, SUPPORT_WEB_LIST } from '@common/constants'

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
  'utc2locale',
  'copyAddress'
] as const

export type OptKeys = typeof OPTIONS[number]

export interface OptWebsite extends Record<string, unknown> {
  name: string
  domains: string[]
  enabled: boolean
}

export type Options = Record<OptKeys, boolean | string | OptWebsite[]>

export type StorageInfo = {
  options: Options
}

export const defaultValue: StorageInfo = {
  /** default settings */
  options: {
    supportWebList: SUPPORT_WEB_LIST.map(item => ({
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
    utc2locale: false,
    copyAddress: true
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
