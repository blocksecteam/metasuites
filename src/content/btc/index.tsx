import browser from 'webextension-polyfill'
import '@common/styles/inject.common'

import { EXECUTE_BTC_CONTENT_SCRIPT } from '@common/constants'

import runScript from './main'

export const initBTCExplorer = () => {
  runScript()
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === EXECUTE_BTC_CONTENT_SCRIPT) {
      runScript()
      sendResponse()
    }
  })
}
