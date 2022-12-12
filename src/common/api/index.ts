import request, { type BscResponse } from './request'
import type {
  PostAddressListParams,
  PostAddressMethodParams,
  RiskScore,
  PostAddressParams,
  PostAddressRiskScoreParams,
  AddressLabel,
  MethodLabel,
  FundFlowResponse
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
      .post('api/v1/address-action', {
        json: params
      })
      .json<BscResponse<FundFlowResponse>>()
}
