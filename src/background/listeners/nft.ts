import { chromeEvent } from '@common/event'
import {
  GET_NFT_RARITY_RANK,
  GET_NFT_RISK,
  GET_NFT_USER_LABELS
} from '@common/constants'
import commonApi from '@common/api'
import { isNil } from '@common/utils'

export default function initNFTRequest() {
  chromeEvent.on(GET_NFT_RARITY_RANK, async params => {
    try {
      const res = await commonApi.getNFTRarityRank(params)
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

  chromeEvent.on(GET_NFT_RISK, async params => {
    try {
      const res = await commonApi.getNFTRisk(params)
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

  chromeEvent.on(GET_NFT_USER_LABELS, async params => {
    try {
      const res = await commonApi.getNFTUserLabels(params)
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
