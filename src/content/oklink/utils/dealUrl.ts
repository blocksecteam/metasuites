import CHAIN from '../constant/chain'
import GLOBAL from '../constant/global'

export const getAddressUrl = ({ address }: { address?: string }) => {
  return `${GLOBAL.prefixPath}/${CHAIN.chainPath}/address/${address}`
}
