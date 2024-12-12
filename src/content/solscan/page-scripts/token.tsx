import browser from 'webextension-polyfill'

import { store } from '@src/store'
import { GET_SOLSCAN_ACCOUNT_TAB_DATA, SOLSCAN_PAGES } from '@common/constants'

import { renderFundFlowButton, renderEnhancedLabels } from '../feat-scripts'
import { lazyLoad, trigger } from '../helper'

const initTokenPageScript = async () => {
  const { fundFlow, enhancedLabels } = await store.get('options')

  lazyLoad(() => {
    if (fundFlow) renderFundFlowButton(SOLSCAN_PAGES.TOKEN.name)
    if (enhancedLabels) {
      renderEnhancedLabels()
    }
    trigger()
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
