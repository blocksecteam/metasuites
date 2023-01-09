import request, { type BscResponse } from './request'
import type {
  PostAddressListParams,
  PostAddressMethodParams,
  RiskScore,
  PostAddressParams,
  PostAddressRiskScoreParams,
  AddressLabel,
  MethodLabel,
  FundFlowResponse,
  NFTInfoResponse,
  NFTPriceResponse,
  NFTRarityRankReq,
  NFTRarityRankResponse,
  NFTRiskResponse,
  NFTUserLabelsReq,
  NFTUserLabelsResponse,
  AddressFunderRiskResponse,
  PostComprehensiveSearchParams,
  SearchResultItem
} from './types'

export default {
  getAddressRiskScore: (params: PostAddressRiskScoreParams) =>
    request
      .post('api/v1/address-risk-score', { json: params })
      .json<BscResponse<RiskScore[]>>(),
  getAddressLabel: (params: PostAddressListParams) =>
    request
      .post('api/v1/address-label', { json: params })
      .json<BscResponse<AddressLabel[]>>(),
  getAddressMethod: (params: PostAddressMethodParams) =>
    request
      .post('api/v1/address-method', { json: params })
      .json<BscResponse<MethodLabel[]>>(),
  getAddressFundFlow: (params: PostAddressParams) =>
    request
      .post('api/v1/fund-flow', {
        json: params
      })
      .json<BscResponse<FundFlowResponse>>(),
  getNFTInfo: (address: string) =>
    request
      .post('api/v1/nft-info', {
        json: { address }
      })
      .json<BscResponse<NFTInfoResponse>>(),
  getNFTPrice: (address: string) =>
    request
      .post('api/v1/nft-floor-price', {
        json: { address }
      })
      .json<BscResponse<NFTPriceResponse>>(),
  getNFTRarityRank: (params: NFTRarityRankReq) =>
    request
      .post('api/v1/nft-batch-rarity-rank', {
        json: params
      })
      .json<BscResponse<NFTRarityRankResponse>>(),
  getNFTRisk: (params: PostAddressParams) =>
    request
      .post('api/v1/nft-risk', { json: params })
      .json<BscResponse<NFTRiskResponse>>(),
  getNFTUserLabels: (params: NFTUserLabelsReq) =>
    request
      .post('api/v1/nft-user-label', { json: params })
      .json<BscResponse<NFTUserLabelsResponse>>(),
  getAddressFunderRisk: (params: PostAddressParams) =>
    request
      .post('api/v1/address-funder-risk', { json: params })
      .json<BscResponse<AddressFunderRiskResponse>>(),
  getComprehensiveSearchResults: (params: PostComprehensiveSearchParams) =>
    request
      .post('api/v1/comprehensive-search', { json: params })
      .json<BscResponse<SearchResultItem[]>>()
}
