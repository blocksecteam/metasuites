import browser from 'webextension-polyfill'

import allowlist from '@common/config/allowlist'
import { URL_UPDATED } from '@common/constants'

import execute from './main'

export class JitoInitializer {
  static matches = allowlist.JITO_MATCHES
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
