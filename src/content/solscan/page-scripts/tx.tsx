import browser from 'webextension-polyfill'

import { store } from '@src/store'
import { GET_SOLSCAN_TRANSACTION } from '@common/constants'

import {
  renderTxPageAddressLabels,
  renderAlternativeParsers
} from '../feat-scripts'
import { lazyLoad } from '../helper'

const initTxPageScript = async () => {
  const { enhancedLabels, quick2Parsers } = await store.get('options')

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_SOLSCAN_TRANSACTION) {
      lazyLoad(() => {
        if (enhancedLabels) renderTxPageAddressLabels()
        if (quick2Parsers) renderAlternativeParsers()
      }, 'div[data-state="active"]')
      sendResponse()
    }
  })
}

export default initTxPageScript
