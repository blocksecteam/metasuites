import { createRoot } from 'react-dom/client'

import { isSupportEthervm } from '@common/utils'

import { DecompileInEthervmBtn } from '../components'
import CHAIN from '../constant/chain'
import { createTimerFn } from '../utils'
import { getContractCodeHeaderDom } from '../utils/dom'

/** Show quick open in ethervm.io for unverified contracts */
const genDecompileInEthervmBtn = (address: string) => {
  const chain = CHAIN.chain
  if (!isSupportEthervm(chain)) return
  createTimerFn(async () => {
    const contractCodeHeader = getContractCodeHeaderDom();
    if (!contractCodeHeader) { return };
    const rooltEl = document.createElement('div');
    contractCodeHeader.append(rooltEl);
    createRoot(rooltEl).render(
      <DecompileInEthervmBtn chain={chain} mainAddress={address} />
    )
  })()
}

export default genDecompileInEthervmBtn
