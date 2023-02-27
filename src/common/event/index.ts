import { Event } from 'chrome-extension-core'

import { SCOPE } from '@common/constants'
import type {
  AddressMethodsReq,
  PostAddressParams,
  PostAddressesParams,
  AddressRiskScoreReq,
  NFTRarityRankReq,
  NFTUserLabelsReq,
  ComprehensiveSearchReq,
  ApprovalsRiskReq,
  FortaAlertReq
} from '@common/api/types'
import type {
  REFRESH,
  GET_ADDRESS_RISK_SCORE,
  GET_ADDRESS_LABELS,
  GET_ADDRESS_METHODS,
  GET_ADDRESS_FUND_FLOW,
  GET_NFT_INFO,
  GET_NFT_PRICE,
  GET_NFT_RISK,
  GET_NFT_RARITY_RANK,
  GET_NFT_USER_LABELS,
  GET_ADDRESS_FUNDER_RISK,
  GET_COMPREHENSIVE_SEARCH_RESULTS,
  GET_APPROVAL_RISK,
  GET_FORTA_ALERT
} from '@common/constants/event'

export type EventInfo = {
  [REFRESH]: boolean
  [GET_ADDRESS_RISK_SCORE]: AddressRiskScoreReq
  [GET_ADDRESS_LABELS]: PostAddressesParams
  [GET_ADDRESS_METHODS]: AddressMethodsReq
  [GET_ADDRESS_FUND_FLOW]: PostAddressParams
  [GET_NFT_INFO]: string
  [GET_NFT_PRICE]: string
  [GET_NFT_RARITY_RANK]: NFTRarityRankReq
  [GET_NFT_RISK]: PostAddressParams
  [GET_NFT_USER_LABELS]: NFTUserLabelsReq
  [GET_ADDRESS_FUNDER_RISK]: PostAddressParams
  [GET_COMPREHENSIVE_SEARCH_RESULTS]: ComprehensiveSearchReq
  [GET_APPROVAL_RISK]: ApprovalsRiskReq
  [GET_FORTA_ALERT]: FortaAlertReq
}

export const chromeEvent = new Event<EventInfo>(SCOPE)
