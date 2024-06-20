import browser from 'webextension-polyfill'

import { store } from '@src/store'
import { GET_SOLSCAN_BLOCK_TXS } from '@common/constants'

import { renderTransactionHashPhalconLink } from '../feat-scripts'
import { lazyLoad } from '../helper'

const initBlockPageScript = async () => {
  const { quick2Parsers } = await store.get('options')

  lazyLoad(
    () => {
      if (quick2Parsers) renderTransactionHashPhalconLink()
    },
    '.animate-pulse',
    false
  )

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_SOLSCAN_BLOCK_TXS) {
      lazyLoad(
        () => {
          if (quick2Parsers) renderTransactionHashPhalconLink()
        },
        '.animate-pulse',
        false
      )
      sendResponse()
    }
  })
}

export default initBlockPageScript
