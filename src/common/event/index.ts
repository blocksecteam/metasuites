import { Event } from 'chrome-extension-core'

import { SCOPE } from '@common/constants'
import type {
  PostAddressListParams,
  PostAddressMethodParams,
  PostAddressParams,
  PostAddressRiskScoreParams
} from '@common/api/types'
import type {
  REFRESH,
  GET_ADDRESS_RISK_SCORE,
  GET_ADDRESS_LABEL,
  GET_ADDRESS_METHOD,
  GET_ADDRESS_FUND_FLOW
} from '@common/constants/event'

type EventInfo = {
  [REFRESH]: boolean
  [GET_ADDRESS_RISK_SCORE]: PostAddressRiskScoreParams
  [GET_ADDRESS_LABEL]: PostAddressListParams
  [GET_ADDRESS_METHOD]: PostAddressMethodParams
  [GET_ADDRESS_FUND_FLOW]: PostAddressParams
}

export const chromeEvent = new Event<EventInfo>(SCOPE)
