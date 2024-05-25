import browser from 'webextension-polyfill'

import '@common/styles/inject.common'
import { getPageName, isHashItemsSimilar } from '@common/utils'
import { URL_UPDATED } from '@common/constants'

import execute from './main'

export const initSolanaExplorer = async () => {
  execute()
  let pageName = getPageName(window.location.hash.substring(1))
  let originURL = window.location.href
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === URL_UPDATED) {
      const newPageName = getPageName()
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
