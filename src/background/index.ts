import { chromeEvent } from '@common/event'
import { reloadCurrentTab } from '@common/utils'
import {
  REFRESH,
  EXECUTE_BTC_CONTENT_SCRIPT,
  GET_TOKEN_APPROVAL_DATATABLE,
  GET_TOKEN_APPROVAL_ERC20_FILTER
} from '@common/constants'

import { initBackgroundRequest } from './listeners'

/** refresh current page (usually user change the settings) */
chromeEvent.on(REFRESH, () => {
  reloadCurrentTab()
})

/** reload BTC content script  */
chrome.webRequest.onCompleted.addListener(
  async details => {
    const { tabId } = details

    if (tabId) {
      chrome.tabs.sendMessage(tabId, EXECUTE_BTC_CONTENT_SCRIPT, function () {
        /** ⚠️ do not delete following code that will cause a warning */
        if (!chrome.runtime.lastError) {
          // if you have any response
        }
      })
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
chrome.webRequest.onCompleted.addListener(
  async details => {
    const { tabId } = details

    if (tabId) {
      chrome.tabs.sendMessage(tabId, GET_TOKEN_APPROVAL_DATATABLE, function () {
        /** ⚠️ do not delete following code that will cause a warning */
        if (!chrome.runtime.lastError) {
          // if you have any response
        }
      })
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

chrome.webRequest.onCompleted.addListener(
  async details => {
    const { tabId } = details

    if (tabId) {
      chrome.tabs.sendMessage(
        tabId,
        GET_TOKEN_APPROVAL_ERC20_FILTER,
        function () {
          /** ⚠️ do not delete following code that will cause a warning */
          if (!chrome.runtime.lastError) {
            // if you have any response
          }
        }
      )
    }
  },
  {
    urls: ['https://*/tokenapprovalchecker.aspx/GetERC20TokenApprovalForFilter']
  }
)

initBackgroundRequest()
