import browser from 'webextension-polyfill'

import { store } from '@src/store'
import { GET_SOLSCAN_ACCOUNT_TAB_DATA, SOLSCAN_PAGES } from '@common/constants'

import {
  renderFundFlowButton,
  renderMainAddressLabel,
  renderEnhancedLabels,
  renderTransactionHashPhalconLink
} from '../feat-scripts'
import { lazyLoad, trigger } from '../helper'

const initAccountPageScript = async () => {
  const { fundFlow, enhancedLabels, quick2Parsers } = await store.get('options')

  lazyLoad(() => {
    if (fundFlow) renderFundFlowButton(SOLSCAN_PAGES.ACCOUNT.name)
    if (enhancedLabels) {
      renderMainAddressLabel()
      renderEnhancedLabels()
    }
    trigger()
  }, '#account-tabs')

  lazyLoad(
    () => {
      if (quick2Parsers) renderTransactionHashPhalconLink()
    },
    '.animate-pulse',
    false
  )

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_SOLSCAN_ACCOUNT_TAB_DATA) {
      requestIdleCallback(() => {
        if (enhancedLabels) renderEnhancedLabels()
        if (quick2Parsers) renderTransactionHashPhalconLink()
      })
      sendResponse()
    }
  })
}

export default initAccountPageScript
