import browser from 'webextension-polyfill'

import { chromeEvent } from '@common/event'
import { reloadCurrentTab } from '@common/utils'
import {
  REFRESH,
  EXECUTE_BTC_CONTENT_SCRIPT,
  GET_TOKEN_APPROVAL_DATATABLE,
  GET_TOKEN_APPROVAL_ERC20_FILTER,
  TRONSCAN_TABS_CHANGED,
  LOAD_TRON_APPROVALS,
  TRONSCAN_MULTI_SEARCH,
  URL_UPDATED
} from '@common/constants'

import { initBackgroundRequest } from './listeners'

/** refresh current page (usually user change the settings) */
chromeEvent.on(REFRESH, () => {
  reloadCurrentTab()
})

/** url updated (spa) */
browser.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.url) {
    if (tabId) {
      browser.tabs.sendMessage(tabId, URL_UPDATED).catch(() => void 0)
    }
  }
})

/** reload BTC content script  */
browser.webRequest.onCompleted.addListener(
  async details => {
    const { tabId } = details

    if (tabId) {
      browser.tabs
        .sendMessage(tabId, EXECUTE_BTC_CONTENT_SCRIPT)
        .catch(() => void 0)
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
      browser.tabs
        .sendMessage(tabId, GET_TOKEN_APPROVAL_DATATABLE)
        .catch(() => void 0)
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
      browser.tabs
        .sendMessage(tabId, GET_TOKEN_APPROVAL_ERC20_FILTER)
        .catch(() => void 0)
    }
  },
  {
    urls: ['https://*/tokenapprovalchecker.aspx/GetERC20TokenApprovalForFilter']
  }
)

browser.webRequest.onCompleted.addListener(
  async details => {
    const { tabId, method } = details
    if (tabId && method === 'GET') {
      browser.tabs.sendMessage(tabId, TRONSCAN_TABS_CHANGED).catch(() => void 0)
    }
  },
  {
    urls: [
      'https://apilist.tronscanapi.com/api/transaction?*',
      'https://apilist.tronscanapi.com/api/filter/trc20/transfers?*',
      'https://apilist.tronscanapi.com/api/internal-transaction?*',
      'https://apilist.tronscanapi.com/api/account/tokens?*',
      'https://apilist.tronscanapi.com/api/token_trc20/transfers?*',
      'https://apilist.tronscanapi.com/api/token_trc20/holders?*',
      'https://apilist.tronscanapi.com/api/asset/transfer?*',
      'https://apilist.tronscanapi.com/api/tokenholders?*',
      'https://api.trongrid.io/wallet/getcontract?*'
    ]
  }
)

browser.webRequest.onCompleted.addListener(
  async details => {
    const { tabId, method } = details
    if (tabId && method === 'GET') {
      browser.tabs.sendMessage(tabId, LOAD_TRON_APPROVALS).catch(() => void 0)
    }
  },
  {
    urls: ['https://apilist.tronscanapi.com/api/account/approve/list?*']
  }
)

browser.webRequest.onCompleted.addListener(
  async details => {
    const { tabId, method } = details
    if (tabId && method === 'GET') {
      browser.tabs.sendMessage(tabId, TRONSCAN_MULTI_SEARCH).catch(() => void 0)
    }
  },
  {
    urls: ['https://apilist.tronscanapi.com/api/multi/search?*']
  }
)

initBackgroundRequest()
