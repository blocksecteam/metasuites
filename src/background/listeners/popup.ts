import { chromeEvent } from '@common/event'
import { GET_COMPREHENSIVE_SEARCH_RESULTS } from '@common/constants'
import commonApi from '@common/api'
import { isNil } from '@common/utils'

export default function initPopupRequest() {
  chromeEvent.on(GET_COMPREHENSIVE_SEARCH_RESULTS, async params => {
    try {
      const res = await commonApi.getComprehensiveSearchResults(params)
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
