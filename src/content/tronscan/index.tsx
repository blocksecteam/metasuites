import browser from 'webextension-polyfill'

import '@common/styles/inject.common'
import { URL_UPDATED } from '@common/constants'
import { getPageName } from '@common/utils'

import runScript from './main'
import { isHashItemsSimilar } from './helper'

export const initTronscan = async () => {
  runScript()
  let pageName = getPageName(window.location.hash.substring(1))
  let originURL = window.location.href
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === URL_UPDATED) {
      const newPageName = getPageName(window.location.hash.substring(1))
      if (newPageName !== pageName) {
        runScript()
      } else {
        const isSimilar = isHashItemsSimilar(
          new URL(originURL).hash,
          window.location.hash,
          3
        )
        if (!isSimilar) {
          runScript()
        }
      }
      originURL = window.location.href
      pageName = newPageName
      sendResponse()
    }
  })
}
