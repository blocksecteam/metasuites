import browser from 'webextension-polyfill'

import { store } from '@src/store'
import { GET_SOLSCAN_TRANSACTION } from '@common/constants'

import { renderTxPageAddressLabels } from '../feat-scripts'

const initTxPageScript = async () => {
  const { enhancedLabels } = await store.get('options')

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_SOLSCAN_TRANSACTION) {
      requestIdleCallback(() => {
        if (enhancedLabels) renderTxPageAddressLabels()
      })
      sendResponse()
    }
  })
}

export default initTxPageScript
