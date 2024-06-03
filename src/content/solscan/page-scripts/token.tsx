import browser from 'webextension-polyfill'

import { store } from '@src/store'
import { GET_SOLSCAN_ACCOUNT_TAB_DATA } from '@common/constants'

import { renderFundFlowButton, renderEnhancedLabels } from '../feat-scripts'
import { lazyLoad } from '../helper'

const initTokenPageScript = async () => {
  const { fundFlow, enhancedLabels } = await store.get('options')

  lazyLoad(() => {
    if (fundFlow) renderFundFlowButton()
    if (enhancedLabels) {
      renderEnhancedLabels()
    }
  }, 'div[data-state="active"] table tbody tr:not(:has(div.animate-pulse))')

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_SOLSCAN_ACCOUNT_TAB_DATA) {
      requestIdleCallback(() => {
        if (enhancedLabels) renderEnhancedLabels()
      })
      sendResponse()
    }
  })
}

export default initTokenPageScript
