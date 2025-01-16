import { createRoot } from 'react-dom/client'
import { DecompileInDedaubBtn } from '../components'
import { getContractCodeHeaderDom } from '../utils/dom'
import { createTimerFn } from '../utils'
import CHAIN from '../constant/chain'

/** decompile by app.dedaub.com */
const genDecompileInDedaubBtn = (address: string) => {
  const chain = CHAIN.chain
  createTimerFn(async () => {
    const contractCodeHeader = getContractCodeHeaderDom()
    if (!contractCodeHeader) {
      return
    }
    const rooltEl = document.createElement('div')
    contractCodeHeader.append(rooltEl)
    createRoot(rooltEl).render(
      <DecompileInDedaubBtn chain={chain} mainAddress={address} />
    )
  })()
}

export default genDecompileInDedaubBtn
