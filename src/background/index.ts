import { chromeEvent } from '@common/event'
import { reloadCurrentTab, isNil } from '@common/utils'
import commonApi from '@common/api'
import {
  REFRESH,
  GET_ADDRESS_RISK_SCORE,
  GET_ADDRESS_LABEL,
  GET_ADDRESS_METHOD,
  GET_ADDRESS_FUND_FLOW,
  EXECUTE_BTC_CONTENT_SCRIPT
} from '@common/constants'

/** refresh current page (usually user change the settings) */
chromeEvent.on(REFRESH, () => {
  reloadCurrentTab()
})

chromeEvent.on(GET_ADDRESS_RISK_SCORE, async params => {
  try {
    const res = await commonApi.getAddressRiskScore(params)
    return {
      success: isNil(res.code),
      data: res,
      message: res.message ?? 'success'
    }
  } catch (error) {
    /** external exception */
    return { success: false, data: error, message: 'error' }
  }
})

chromeEvent.on(GET_ADDRESS_LABEL, async params => {
  try {
    const res = await commonApi.getAddressLabel(params)
    return {
      success: isNil(res.code),
      data: res,
      message: res.message ?? 'success'
    }
  } catch (error) {
    /** external exception */
    return { success: false, data: error, message: 'error' }
  }
})

chromeEvent.on(GET_ADDRESS_METHOD, async params => {
  try {
    const res = await commonApi.getAddressMethod(params)
    return {
      success: isNil(res.code),
      data: res,
      message: res.message ?? 'success'
    }
  } catch (error) {
    /** external exception */
    return { success: false, data: error, message: 'error' }
  }
})

chromeEvent.on(GET_ADDRESS_FUND_FLOW, async params => {
  try {
    const res = await commonApi.getAddressFundFlow(params)
    return {
      success: isNil(res.code),
      data: res,
      message: res.message ?? 'success'
    }
  } catch (error) {
    /** external exception */
    return { success: false, data: error, message: 'error' }
  }
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
