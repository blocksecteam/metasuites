import { createRoot } from 'react-dom/client'

import { DeBankBtn } from '../components'

const setBtn = (txHashEl: HTMLElement, mainAddress: string) => {
  const btnRootEl = document.createElement('div')
  btnRootEl.style.display = 'inline-block'
  btnRootEl.classList.add('mt-2')
  btnRootEl.style.verticalAlign = 'bottom'
  txHashEl?.appendChild(btnRootEl)
  createRoot(btnRootEl).render(<DeBankBtn mainAddress={mainAddress} />)
}

const genDeBankBtn = async () => {
  const mainAddress =
    document.querySelector<HTMLElement>('#mainaddress')?.innerText
  if (!mainAddress) return
  const txHashEl = document.querySelector<HTMLElement>(
    '#content > div.container'
  )
  if (txHashEl) {
    setBtn(txHashEl, mainAddress)
  }
}

export default genDeBankBtn
