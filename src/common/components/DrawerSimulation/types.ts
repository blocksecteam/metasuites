import type {
  ContractMethodSelectOptions,
  ContractMethodOption,
  ContractABI,
  SimulateTxParams
} from '@common/api/types'

export interface FormattedContractData {
  functionName?: string
  params?: any[]
  methodsOptions: ContractMethodSelectOptions
  methods: ContractMethodOption[]
  abi: ContractABI
}

export interface FormData extends SimulateTxParams {
  useABI: boolean
  useLocalABI: boolean
  localABI: string
  function: string
  parameters: Record<string, any>
}

export interface ReadableInputData {
  id: string
  name: string
  value: any
  dataType: string
  dataGrp?: string
  argumentName: string
}
