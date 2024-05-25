import $ from 'jquery'

import { store } from '@src/store'

import { lazyLoad } from '../helper'
import { renderFundFlowButton, renderMainAddressLabel } from '../feat-scripts'

const createAccountBox = () => {
  if ($('#md-account-box').length) return Promise.reject()
  const container = $(
    'body > div.main-content > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > h3'
  )
  const mainAddress = $(
    'body > div.main-content > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > div:nth-of-type(1) > span:nth-of-type(2)'
  )
    .text()
    .trim()
  const hasRefreshBtn = container.siblings('button').length > 0
  const accountBox = $(
    `<div id="md-account-box" class="md-flex items-center flex-wrap" style="gap: 16px;margin-right: ${
      hasRefreshBtn ? '16px' : '0'
    }" data-address="${mainAddress}"></div>`
  )
  container.after(accountBox)
  return Promise.resolve()
}

const initAddressPageScript = async () => {
  const { fundFlow, enhancedLabels } = await store.get('options')
  lazyLoad(
    () =>
      createAccountBox().then(() => {
        if (fundFlow) renderFundFlowButton()
        if (enhancedLabels) {
          renderMainAddressLabel()
        }
      }),
    `body > div.main-content > div:nth-of-type(3) > div:nth-of-type(2) > div > span[class*="spinner"]`
  )
}

export default initAddressPageScript
