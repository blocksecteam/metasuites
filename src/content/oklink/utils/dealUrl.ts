import CHAIN from '../constant/chain'
import GLOBAL from '../constant/global'

export const getAddressUrl = ({ address }: { address?: string }) => {
  return `${GLOBAL.prefixPath}/${CHAIN.chainPath}/address/${address}`
}
export const getTxUrl = ({ hash }: { hash?: string }) => {
  return `${GLOBAL.prefixPath}/${CHAIN.chainPath}/tx/${hash}`
}
export const getBlockUrl = ({ block }: { block?: number }) => {
  return `${GLOBAL.prefixPath}/${CHAIN.chainPath}/block/${block}`
}
