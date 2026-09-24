import { createRoot } from 'react-dom/client'

import { ChainFeature } from '@common/config/chain-feature'

import { DeBankBtn } from '../components'

const setBtn = (txHashEl: HTMLElement, mainAddress: string) => {
  const btnRootEl = document.createElement('div')
  btnRootEl.style.display = 'inline-block'
  btnRootEl.classList.add('mt-2')
  btnRootEl.style.verticalAlign = 'bottom'
  txHashEl?.appendChild(btnRootEl)
  createRoot(btnRootEl).render(<DeBankBtn mainAddress={mainAddress} />)
}

/** open in debank.com */
const genDeBankBtn = async (chain: string) => {
  if (!ChainFeature.supports('debank', chain)) return
  const mainAddress =
    document.querySelector<HTMLElement>('#mainaddress')?.innerText
  if (!mainAddress) return
  const txHashEl = document.querySelector<HTMLElement>(
    '#content > section.container-xxl'
  )
  if (txHashEl) {
    setBtn(txHashEl, mainAddress)
  }
}

export default genDeBankBtn
