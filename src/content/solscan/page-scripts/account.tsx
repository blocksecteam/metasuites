import browser from 'webextension-polyfill'

import { store } from '@src/store'
import { GET_SOLSCAN_ACCOUNT_TAB_DATA, SOLSCAN_PAGES } from '@common/constants'

import {
  renderFundFlowButton,
  renderMainAddressLabel,
  renderEnhancedLabels
} from '../feat-scripts'
import { lazyLoad } from '../helper'

const initAccountPageScript = async () => {
  const { fundFlow, enhancedLabels } = await store.get('options')

  lazyLoad(() => {
    if (fundFlow) renderFundFlowButton(SOLSCAN_PAGES.ACCOUNT.name)
    if (enhancedLabels) {
      renderMainAddressLabel()
      renderEnhancedLabels()
    }
  }, '#account-tabs')

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_SOLSCAN_ACCOUNT_TAB_DATA) {
      requestIdleCallback(() => {
        if (enhancedLabels) renderEnhancedLabels()
      })
      sendResponse()
    }
  })
}

export default initAccountPageScript
