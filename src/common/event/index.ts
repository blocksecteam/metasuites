import { Event } from 'chrome-extension-core'

import { SCOPE } from '@common/constants'
import type {
  PostAddressListParams,
  PostAddressMethodParams,
  PostAddressParams,
  PostAddressRiskScoreParams,
  NFTRarityRankReq,
  NFTUserLabelsReq,
  PostComprehensiveSearchParams
} from '@common/api/types'
import type {
  REFRESH,
  GET_ADDRESS_RISK_SCORE,
  GET_ADDRESS_LABEL,
  GET_ADDRESS_METHOD,
  GET_ADDRESS_FUND_FLOW,
  GET_NFT_INFO,
  GET_NFT_PRICE,
  GET_NFT_RISK,
  GET_NFT_RARITY_RANK,
  GET_NFT_USER_LABELS,
  GET_ADDRESS_FUNDER_RISK,
  GET_COMPREHENSIVE_SEARCH_RESULTS
} from '@common/constants/event'

export type EventInfo = {
  [REFRESH]: boolean
  [GET_ADDRESS_RISK_SCORE]: PostAddressRiskScoreParams
  [GET_ADDRESS_LABEL]: PostAddressListParams
  [GET_ADDRESS_METHOD]: PostAddressMethodParams
  [GET_ADDRESS_FUND_FLOW]: PostAddressParams
  [GET_NFT_INFO]: string
  [GET_NFT_PRICE]: string
  [GET_NFT_RARITY_RANK]: NFTRarityRankReq
  [GET_NFT_RISK]: PostAddressParams
  [GET_NFT_USER_LABELS]: NFTUserLabelsReq
  [GET_ADDRESS_FUNDER_RISK]: PostAddressParams
  [GET_COMPREHENSIVE_SEARCH_RESULTS]: PostComprehensiveSearchParams
}

export const chromeEvent = new Event<EventInfo>(SCOPE)
