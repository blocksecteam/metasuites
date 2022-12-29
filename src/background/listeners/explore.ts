import { chromeEvent } from '@common/event'
import {
  GET_ADDRESS_RISK_SCORE,
  GET_ADDRESS_LABEL,
  GET_ADDRESS_METHOD,
  GET_ADDRESS_FUND_FLOW,
  GET_NFT_INFO,
  GET_NFT_PRICE,
  GET_ADDRESS_FUNDER_RISK
} from '@common/constants'
import commonApi from '@common/api'
import { isNil } from '@common/utils'

export default function initExploreRequest() {
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

  chromeEvent.on(GET_NFT_INFO, async address => {
    try {
      const res = await commonApi.getNFTInfo(address)
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

  chromeEvent.on(GET_NFT_PRICE, async address => {
    try {
      const res = await commonApi.getNFTPrice(address)
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
  chromeEvent.on(GET_ADDRESS_FUNDER_RISK, async params => {
    try {
      const res = await commonApi.getAddressFunderRisk(params)
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
}
