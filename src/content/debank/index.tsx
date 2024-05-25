import browser from 'webextension-polyfill'

import '@common/styles/inject.common'
import { URL_UPDATED } from '@common/constants'
import { store } from '@src/store'

import { renderMainAddressLabel } from './feat-scripts'
import { lazyLoad } from './helper'

export const initDebank = async () => {
  execute()
  async function execute() {
    const { enablePrivateLabels } = await store.get('options')
    // profile page
    if (/^\/profile\/(0x[a-fA-F\d]{40})/i.test(window.location.pathname)) {
      lazyLoad(() => {
        if (enablePrivateLabels) renderMainAddressLabel()
      }, 'div[class^="HeaderInfo_headerInfo"]')
    }
  }
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === URL_UPDATED) {
      execute()
      sendResponse()
    }
  })
}
