import { createRoot } from 'react-dom/client'

import { ChainFeature } from '@common/config/chain-feature'

import { FundFlowBtn } from '../components'

const setBtn = (txHashEl: HTMLElement, chain: string, mainAddress: string) => {
  const btnRootEl = document.createElement('div')
  btnRootEl.style.display = 'inline-block'
  btnRootEl.classList.add('mt-2')
  btnRootEl.style.verticalAlign = 'bottom'
  txHashEl?.appendChild(btnRootEl)
  createRoot(btnRootEl).render(
    <FundFlowBtn chain={chain} mainAddress={mainAddress} />
  )
}

/** fund flow */
const genFundFlow = async (chain: string) => {
  if (!ChainFeature.supports('fundFlow', chain)) return

  const mainAddress =
    document.querySelector<HTMLElement>('#mainaddress')?.innerText
  if (!mainAddress) return
  const txHashEl = document.querySelector<HTMLElement>(
    '#content > section.container-xxl'
  )
  if (txHashEl) {
    setBtn(txHashEl, chain, mainAddress)
  }
}

export default genFundFlow
