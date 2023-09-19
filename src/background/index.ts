import browser from 'webextension-polyfill'

import { chromeEvent } from '@common/event'
import { reloadCurrentTab, getURL } from '@common/utils'
import {
  REFRESH,
  EXECUTE_BTC_CONTENT_SCRIPT,
  GET_TOKEN_APPROVAL_DATATABLE,
  GET_TOKEN_APPROVAL_ERC20_FILTER
} from '@common/constants'
import { store } from '@src/store'

import { initBackgroundRequest } from './listeners'

/** refresh current page (usually user change the settings) */
chromeEvent.on(REFRESH, () => {
  reloadCurrentTab()
})

/** reload BTC content script  */
browser.webRequest.onCompleted.addListener(
  async details => {
    const { tabId } = details

    if (tabId) {
      browser.tabs.sendMessage(tabId, EXECUTE_BTC_CONTENT_SCRIPT)
    }
  },
  {
    urls: [
      'https://explorer.api.btc.com/chain/transaction?*',
      'https://explorer.api.btc.com/chain/address/txs?*'
    ]
  }
)

/** for approval diagnosis  */
browser.webRequest.onCompleted.addListener(
  async details => {
    const { tabId } = details

    if (tabId) {
      browser.tabs.sendMessage(tabId, GET_TOKEN_APPROVAL_DATATABLE)
    }
  },
  {
    urls: [
      // scan v2
      'https://*/tokenapprovalchecker.aspx/GetERC20TokenApprovalDataTable',
      'https://*/tokenapprovalchecker.aspx/GetERC721TokenApprovalForAllDataTable',
      'https://*/tokenapprovalchecker.aspx/GetERC1155TokenApprovalDataTable',
      // scan v1
      'https://*/tokenapprovalchecker.aspx/GetApprovedContract'
    ]
  }
)

browser.webRequest.onCompleted.addListener(
  async details => {
    const { tabId } = details

    if (tabId) {
      browser.tabs.sendMessage(tabId, GET_TOKEN_APPROVAL_ERC20_FILTER)
    }
  },
  {
    urls: ['https://*/tokenapprovalchecker.aspx/GetERC20TokenApprovalForFilter']
  }
)

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'update' || reason === 'install') {
    store.get('installed').then(installed => {
      if (!installed) {
        browser.tabs
          .create({
            url: getURL('src/pages/UpgradeGuide/index.html')
          })
          .then(() => {
            store.set('installed', true)
          })
      }
    })
  }
})

initBackgroundRequest()
