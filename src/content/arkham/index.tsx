import browser from 'webextension-polyfill'

import '@common/styles/inject.common'
import { URL_UPDATED } from '@common/constants'
import allowlist from '@common/config/allowlist'

import execute from './main'

export class ArkhamInitializer {
  static matches = allowlist.ARKHAM_MATCHES
  async init() {
    execute()
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message === URL_UPDATED) {
        execute()
        sendResponse()
      }
    })
  }
}
