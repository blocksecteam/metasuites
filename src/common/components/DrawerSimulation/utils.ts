import type {
  VerifiedContractData,
  ContractMethodSelectOptions,
  ContractABI,
  ContractMethod,
  ContractMethodOption
} from '@common/api/types'

import { FUNC_SPLIT } from './constants'

export const formatContractData = (data: VerifiedContractData) => {
  const methodsOptions: ContractMethodSelectOptions = [
    { label: 'WRITE', options: [] },
    { label: 'READ', options: [] }
  ]
  let abi: ContractABI = {
    proxyABI: '',
    implementationABI: data?.implementation?.abi ?? ''
  }
  let contractMethods: ContractMethod[] = data?.implementation?.methods
  const methods: ContractMethodOption[] = []
  /**如果存在代理合约，需要将代理合约的methods合并 */
  if (data.isProxy) {
    contractMethods = contractMethods.concat(
      (data?.proxy?.methods ?? []).map(item => ({ ...item, isProxy: true }))
    )
    abi = { ...abi, proxyABI: data?.proxy?.abi ?? '' }
  }

  if (!contractMethods?.length) {
    return {
      methods,
      methodsOptions: [],
      abi
    }
  }
  contractMethods?.forEach(item => {
    const { constant, signature, isProxy } = item
    // constant true 表示 READ , 反之表示 WRITE
    const index = constant ? 1 : 0

    methods.push({
      ...item,
      label: signature,
      value: isProxy
        ? `proxy${FUNC_SPLIT}${signature}`
        : `implementation${FUNC_SPLIT}${signature}`
    })
    methodsOptions[index].options.push({
      ...item,
      label: signature,
      value: isProxy
        ? `proxy${FUNC_SPLIT}${signature}`
        : `implementation${FUNC_SPLIT}${signature}`
    })
  })

  return {
    methods,
    methodsOptions,
    abi
  }
}
