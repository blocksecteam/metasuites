import browser from 'webextension-polyfill'
import $ from 'jquery'
import isMobile from 'is-mobile'

import { store } from '@src/store'
import {
  GET_SOLANAFM_ACCOUNT_INFO,
  GET_SOLANAFM_ACCOUNT_TRANSFERS
} from '@common/constants'

import {
  renderFundFlowButton,
  renderMainAddressLabel,
  renderEnhancedLabels
} from '../feat-scripts'
import { lazyLoad } from '../helper'

const createAccountBox = () => {
  if ($('#md-account-box').length) return Promise.reject()
  const isWalletAccount =
    $(
      '#__next > main > div:nth-of-type(2) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div > div > div > div:nth-of-type(1) > div > div > h1'
    )
      .text()
      .indexOf('Wallet Account') !== -1
  const container = $(
    isWalletAccount
      ? '#__next > main > div:nth-of-type(2) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div > div:last-child > div'
      : '#__next > main > div:nth-of-type(2) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div > div:last-child > div > div:nth-of-type(2) > div:nth-of-type(1)'
  )
  const mainAddress = container.find('>span:first-child').text().trim()
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
  const { fundFlow, enhancedLabels } = await store.get('options')

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
