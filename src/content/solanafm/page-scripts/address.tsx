import browser from 'webextension-polyfill'
import $ from 'jquery'
import isMobile from 'is-mobile'

import { store } from '@src/store'
import {
  GET_SOLANAFM_ACCOUNT_INFO,
  GET_SOLANAFM_ACCOUNT_TRANSFERS
} from '@common/constants'
import { pickSolanaAddress } from '@common/utils'

import {
  renderFundFlowButton,
  renderMainAddressLabel,
  renderEnhancedLabels,
  renderTransactionHashPhalconLink
} from '../feat-scripts'
import { lazyLoad } from '../helper'

const createAccountBox = () => {
  if ($('#md-account-box').length) return Promise.reject()
  const container = $(
    '#__next > main > div:nth-of-type(2) > div:nth-of-type(1) > div > div > div:nth-of-type(1) div.text-ellipsis'
  ).parent()
  const mainAddress = pickSolanaAddress(window.location.href)
  const accountBox = $(
    `<div id="md-account-box" class="flex items-center flex-wrap gap-6 pl-5" data-address="${mainAddress}"></div>`
  )
  if (isMobile()) {
    accountBox.remove()
  }
  container.append(accountBox)
  return Promise.resolve()
}

const initAddressPageScript = async () => {
  const { fundFlow, enhancedLabels, quick2Parsers } = await store.get('options')

  lazyLoad(() => {
    if (quick2Parsers) {
      renderTransactionHashPhalconLink()
      $(
        '#__next > main > div:nth-of-type(2) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div:nth-of-type(2)> div:nth-of-type(2) button'
      ).click(function () {
        setTimeout(() => {
          renderTransactionHashPhalconLink()
        })
      })
    }
  }, '.animate-pulse')

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_SOLANAFM_ACCOUNT_INFO) {
      requestIdleCallback(() => {
        createAccountBox().then(() => {
          if (fundFlow) renderFundFlowButton()
          if (enhancedLabels) {
            renderMainAddressLabel()
          }
        })
      })
      sendResponse()
    }
    if (message === GET_SOLANAFM_ACCOUNT_TRANSFERS) {
      requestIdleCallback(() => {
        lazyLoad(() => {
          if (enhancedLabels) renderEnhancedLabels()
        }, '.react-loading-skeleton')
      })
      sendResponse()
    }
  })
}

export default initAddressPageScript
