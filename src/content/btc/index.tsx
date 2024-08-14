import browser from 'webextension-polyfill'
import '@common/styles/inject.common'

import { EXECUTE_BTC_CONTENT_SCRIPT } from '@common/constants'
import allowlist from '@common/config/allowlist'

import execute from './main'

export class BTCInitializer {
  static matches = allowlist.BTC_EXPLORER_MATCHES
  async init() {
    execute()
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message === EXECUTE_BTC_CONTENT_SCRIPT) {
        execute()
        sendResponse()
      }
    })
  }
}
