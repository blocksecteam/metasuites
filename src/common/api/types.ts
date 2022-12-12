import type { RISK_LEVELS } from '@common/constants'

export interface RiskScore {
  address: string
  risk: typeof RISK_LEVELS[number]
  transferAddresses: TransferAddress[]
}

export interface TransferAddress {
  address: string
  risk: typeof RISK_LEVELS[number]
}

export interface PostAddressListParams {
  chain: string
  addresses: string[]
}

export interface PostAddressParams {
  chain: string
  address: string
}

export interface AddressLabel {
  label: string
  address: string
  logo?: string
}

export interface MethodLabel {
  codeHash: string
  function: string
}

export interface PostAddressMethodParams {
  codeHash: string[]
}

export interface PostAddressRiskLabel {
  labels?: string[]
}

export interface PostAddressRiskScoreParams extends PostAddressParams {
  addressLabel?: PostAddressRiskLabel
}

export interface FundFlowResponse {
  nodes: FundFlowNode[]
  edges: FundFlowEdge[]
}
export interface FundFlowNode extends Record<string, unknown> {
  id: number
  chain: string
  address: string
  label: string
  type: number
  /** used for filter */
  selected?: boolean
  index?: number
  showIndex?: boolean
}
export interface FundFlowEdge extends Record<string, unknown> {
  id: number
  from: number
  to: number
  token: string
  tokenLink: string
  tokenLabel: string
  amount: string
  description: string
  /** used for filter */
  selected?: boolean
}
