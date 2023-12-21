import browser from 'webextension-polyfill'

import '@common/styles/inject.common'
import { URL_UPDATED } from '@common/constants'

import runScript from './main'

export const initSnowtrace = async () => {
  runScript()
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === URL_UPDATED) {
      requestIdleCallback(runScript)
      sendResponse()
    }
  })
}
