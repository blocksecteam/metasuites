import browser from 'webextension-polyfill'

import '@common/styles/inject.common'
import { URL_UPDATED } from '@common/constants'
import { getPageName, isHashItemsSimilar } from '@common/utils'
import allowlist from '@common/config/allowlist'

import execute from './main'

export class TronscanInitializer {
  static matches = allowlist.TRONSCAN_MATCHES
  init() {
    execute()
    let pageName = getPageName(window.location.hash.substring(1))
    let originURL = window.location.href
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message === URL_UPDATED) {
        const newPageName = getPageName(window.location.hash.substring(1))
        if (newPageName !== pageName) {
          execute()
        } else {
          const isSimilar = isHashItemsSimilar(
            new URL(originURL).hash,
            window.location.hash,
            3
          )
          if (!isSimilar) {
            execute()
          }
        }
        originURL = window.location.href
        pageName = newPageName
        sendResponse()
      }
    })
  }
}
