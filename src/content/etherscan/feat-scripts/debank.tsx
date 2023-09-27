import { createRoot } from 'react-dom/client'

import { DEBANK_SUPPORT_LIST } from '@common/constants'

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
  if (!DEBANK_SUPPORT_LIST.includes(chain)) return
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
