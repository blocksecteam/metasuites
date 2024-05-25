import browser from 'webextension-polyfill'

import '@common/styles/inject.common'
import { URL_UPDATED } from '@common/constants'

import execute from './main'

export const initSolscan = async () => {
  execute()
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === URL_UPDATED) {
      execute()
      sendResponse()
    }
  })
}
