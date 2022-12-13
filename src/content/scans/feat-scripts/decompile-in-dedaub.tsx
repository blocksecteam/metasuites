import { createRoot } from 'react-dom/client'
import { DecompileInDedaubBtn, CopyByteCodeBtn } from '../components'

const setBtns = (
  parentNode: ParentNode,
  referenceNode: HTMLElement,
  chain: string,
  mainAddress: string
) => {
  /** Decompile in Dedaub */
  const decompileBtnRootEl = document.createElement('div')
  decompileBtnRootEl.setAttribute(
    'style',
    'display:inline-block; vertical-align: middle'
  )
  decompileBtnRootEl.classList.add('mb-1')
  parentNode.insertBefore(decompileBtnRootEl, referenceNode)
  createRoot(decompileBtnRootEl).render(
    <DecompileInDedaubBtn chain={chain} mainAddress={mainAddress} />
  )
  /** copy source code */
  const copyBtnRootEl = document.createElement('span')
  parentNode.insertBefore(copyBtnRootEl, referenceNode)
  createRoot(copyBtnRootEl).render(<CopyByteCodeBtn />)
}

const genDecompileInDedaubBtn = (chain: string) => {
  const contractCodeEl = document.querySelector<HTMLElement>(
    '#ContentPlaceHolder1_contractCodeDiv'
  )

  /** The decompile button is only added when the contract is not open source */
  if (contractCodeEl) return

  const mainAddress =
    document.querySelector<HTMLElement>('#mainaddress')?.innerText

  if (!mainAddress) return

  const isReInit = !!document.querySelector<HTMLElement>(
    "#ContentPlaceHolder1_li_contracts font[color='brown']"
  )

  const referenceNode = document.querySelector<HTMLElement>('#dividcode')

  if (isReInit) {
    const pre = referenceNode?.querySelector('pre')
    if (pre) pre.style.marginTop = '0'
  }

  const parentNode = referenceNode?.parentNode

  if (parentNode) {
    setBtns(parentNode, referenceNode, chain, mainAddress)
  }
}

export default genDecompileInDedaubBtn
