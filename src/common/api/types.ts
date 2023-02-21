import type { AddressRiskLevel, NFTRiskLevel } from '@common/constants'

export interface RiskScore {
  address: string
  risk: AddressRiskLevel
  transferAddresses: TransferAddress[]
}

export interface TransferAddress {
  address: string
  risk: AddressRiskLevel
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
  id: string
  chain: string
  address: string
  label: string
  type: number
  isContract: boolean
  url: string
  /** used for filter */
  selected?: boolean
  index?: number
}
export interface FundFlowEdge extends Record<string, unknown> {
  serial: number
  from: string
  to: string
  token: string
  tokenLabel: string
  amount: string
  description: string
  isCreate: boolean
  tokenLink: string
  ts: string
  /** used for filter */
  selected?: boolean
}

export interface NFTInfoResponse {
  chain: string
  collectionName: string
  nftGoUrl: string
}

export interface NFTPriceResponse {
  priceUSD: string
  price: string
}

export interface NFTRarityRankReq {
  address: string
  tokenIds: string[]
}

export interface NFTRarityRankResItem {
  rank: number
  total: number
  score: number
  tokenId: string
}

export type NFTRarityRankResponse = NFTRarityRankResItem[]

export interface NFTRiskResponse {
  onChain: NFTRiskLevel
  offChain: NFTRiskLevel
  market: NFTRiskLevel
}

export interface NFTUserLabelsReq {
  addresses: string[]
}

export interface NFTUserLabelsResponse {
  labels: Record<string, string>
}

export interface AddressFunderRiskResponse {
  label: string
  risky: boolean
  address: string
}

export interface PostComprehensiveSearchParams {
  type?: number
  keyword: string
}

export type SearchResultType =
  | 'Address'
  | 'ENS'
  | 'Selector'
  | 'Transaction'
  | 'Token'
  | 'NFT'
  | 'GasPrice'
  | 'ApprovalDiagnosis'

export interface SearchResultItemValue {
  address?: string
  url?: string
  chain?: string
  function?: string
  name?: string
  symbol?: string
  selector?: string
  txn?: string
  image?: string
}

export type SearchResultItem = {
  type: SearchResultType
  value: SearchResultItemValue[]
}

export type ApprovalsRiskReq = {
  chain: string
  address: string
}[]
export interface ApprovalRisk {
  risk: number
  chain: string
  address: string
}
