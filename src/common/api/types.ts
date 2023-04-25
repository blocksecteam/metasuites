import type {
  AddressRiskLevel,
  NFTRiskLevel,
  TokenType
} from '@common/constants'
import type { TransactionSummaryType } from '@common/constants'

export interface RiskScore {
  address: string
  risk: AddressRiskLevel
  transferAddresses: TransferAddress[]
}

export interface TransferAddress {
  address: string
  risk: AddressRiskLevel
}

export interface PostAddressesParams {
  chain: string
  addresses: string[]
}

export interface PostAddressParams {
  chain: string
  address: string
}

export interface PostPrivateVariablesParams extends PostAddressParams {
  implAddress?: string
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

export interface AddressMethodsReq {
  codeHash: string[]
}

export interface AddressRiskScoreReq extends PostAddressParams {
  addressLabel?: { labels?: string[]; nameTag?: string }
}

export interface FundFlowRes {
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

export interface NFTInfoRes {
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

export type NFTRarityRankRes = NFTRarityRankResItem[]

export interface NFTRiskRes {
  onChain: NFTRiskLevel
  offChain: NFTRiskLevel
  market: NFTRiskLevel
}

export interface NFTUserLabelsReq {
  addresses: string[]
}

export interface NFTUserLabelsRes {
  labels: Record<string, string>
}

export interface AddressFunderRiskRes {
  label: string
  risky: boolean
  address: string
}

export interface ComprehensiveSearchReq {
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

export interface FortaAlertReq {
  chain: string
  address?: string
  txHashes?: string[]
  blockNumberRange?: { start: number; end: number }
}

export type FortaAlertRes = {
  txHash?: string
  alertUrl: string
  label: string
  subscribeUrl: string
}[]

export interface QueryPrivateVariableReq {
  chain: string
  address: string
  variableName: string
  implAddress?: string
  inputs: string[]
}

export interface PrivateVariableArgument {
  name: string
  type: string
  value: string | PrivateVariableArgument[]
}

export interface PrivateVariable {
  name: string
  inputs: { name: string; type: string }[]
  outputs: { name: string; type: string }[]
  value?: PrivateVariableArgument
}

export type PrivateVariablesRes = PrivateVariable[]

export interface TokenMarket {
  name: string
  url: string
}

export interface TokenMarketplacesRes {
  tokenType: TokenType
  markets: TokenMarket[]
}

export interface GptTxExplainRes {
  role: string
  content: string
  template: number
  type: TransactionSummaryType
}

export interface MarkGptTxExplainReq {
  tx: string
  template: number
  score: 1 | -1
}

export interface ProxyContractLog {
  id: number
  block: number
  ts: number
  proxyAddress: string
  tx: string
  hub: string
}
