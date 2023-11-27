import type {
  AddressRiskLevel,
  NFTRiskLevel,
  TokenType,
  TransactionSummaryType,
  ContractVariableVisibility,
  ContractVariableMutability
} from '@common/constants'

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
  implementAddress?: string
  implementLabel?: string
  implementLogo?: string
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
  label?: string
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
  mutability: ContractVariableMutability
  visibility: ContractVariableVisibility
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

export interface GptTxExplainReq {
  tx: string
  chain: string
}

export interface GptTxExplainRes {
  content: string
  template: number
  type: TransactionSummaryType
}

export interface MarkGptTxExplainReq extends GptTxExplainReq {
  template: number
  score: 1 | -1
}

export interface ProxyContractLog {
  id: number
  block: number
  ts: number
  currentImpl: string
  tx: string
  hub: string
}

export interface VerifiedContractData {
  isProxy: boolean
  proxy?: {
    contractName: string
    methods: ContractMethod[]
    abi: string
  }
  implementation: {
    contractName: string
    methods: ContractMethod[]
    abi: string
  }
  proxyMatch: boolean
  functionName?: string
  unpacked?: boolean
  unpackedCallData?: {
    functionName: string
    signature: string
    params: []
  }
}

export interface ContractMethod {
  name: string
  signature: string
  argumentsIn: Arguments[]
  argumentsOut: Arguments[]
  constant: boolean
  isProxy?: boolean
}

export interface Arguments {
  name: string
  type: string
}

export type ContractMethodSelectOptions = {
  label: string
  options: ContractMethodOption[]
}[]

export interface ContractMethodOption extends ContractMethod {
  label: string
  value: string
}

export interface ContractABI {
  proxyABI: string
  implementationABI: string
}

export interface SimulateTxParams {
  chain: string
  blockNumber?: number
  position?: number
  value: string
  sender: string
  receiver: string
  inputData: string
  gasPrice: string
  gasLimit: number
  isPrerun: boolean
}

export interface GetContractByAddressReq {
  chain: string
  address: string
  callData?: string
}

export interface GetContractByABIReq {
  abi: string
  callData?: string
}

export interface PostSignatureReq {
  chain: string
  contract: string
  selector?: string
  funcName?: string
}

export interface CreationBlock {
  blockNumber: number
  timestamp: number
}

export interface PostContractVariableLogsReq extends PostAddressParams {
  start?: number
  end?: number
  filter: 'time' | 'block'
  variableName: string
  implAddress?: string
  inputs?: { name?: string; type: string; value: string }[]
}

export interface ContractVariableLog {
  block: number
  txHash: string
  timestamp: number
  value?: {
    type: string
    name?: string
    value?: string
    deep: number
  }[]
  isCreation?: boolean
  isFirstUpdate?: boolean
  isHolder?: boolean
}

export interface ContractVariableListItem {
  name: string
  mutability: ContractVariableMutability
  visibility: ContractVariableVisibility
}
