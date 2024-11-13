import { createRoot } from 'react-dom/client'
import { FundFlowBtn } from '../components'
import AddressPage from '../constant/addressPage'
import CHAIN from '../constant/chain'
import { getAddressToolsDom } from '../utils/dom'
import { createTimerFn } from '../utils'

const setBtn = (txHashEl: HTMLElement, chain: string, mainAddress: string) => {
  const btnRootEl = document.createElement('div')
  txHashEl.appendChild(btnRootEl)
  createRoot(btnRootEl).render(
    <FundFlowBtn chain={chain} mainAddress={mainAddress} />
  )
}

/** fund flow */
const genFundFlow = () => {
  createTimerFn(() => {
    const mainAddress = AddressPage.address
    if (!mainAddress) return
    const txHashEl = getAddressToolsDom()
    if (txHashEl) {
      setBtn(txHashEl, CHAIN.chain, mainAddress)
    }
  })()
}

export default genFundFlow
