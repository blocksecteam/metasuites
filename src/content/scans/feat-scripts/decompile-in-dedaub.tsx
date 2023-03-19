import { createRoot } from 'react-dom/client'

import { pickAddress } from '@common/utils'

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
  decompileBtnRootEl.setAttribute('class', 'mb-1 mr-1')
  parentNode.insertBefore(decompileBtnRootEl, referenceNode)
  createRoot(decompileBtnRootEl).render(
    <DecompileInDedaubBtn chain={chain} mainAddress={mainAddress} />
  )
  /** copy source code */
  const copyBtn = document.querySelector<HTMLElement>(
    '#__metadock-copy-byte-code-btn__'
  )
  if (copyBtn) return
  const copyBtnRootEl = document.createElement('span')
  copyBtnRootEl.id = '__metadock-copy-byte-code-btn__'
  parentNode.insertBefore(copyBtnRootEl, referenceNode)
  createRoot(copyBtnRootEl).render(<CopyByteCodeBtn />)
}

/** decompile by library.dedaub.com */
const genDecompileInDedaubBtn = (chain: string) => {
  const contractCodeEl = document.querySelector<HTMLElement>(
    '#ContentPlaceHolder1_contractCodeDiv'
  )

  /** The decompile button is only added when the contract is not open source */
  if (contractCodeEl) return

  const mainAddress = pickAddress(window.location.pathname)

  if (!mainAddress) return

  const isReInit = !!document.querySelector<HTMLElement>(
    "#ContentPlaceHolder1_li_contracts font[color='brown']"
  )

  const isSelfDestruct = !!document.querySelector<HTMLElement>(
    "#ContentPlaceHolder1_li_contracts sup > span[class='text-warning']"
  )

  const referenceNode = document.querySelector<HTMLElement>('#dividcode')

  if (isReInit || isSelfDestruct) {
    const pre = referenceNode?.querySelector('pre')
    if (pre) pre.style.marginTop = '0'
  }

  const parentNode = referenceNode?.parentNode

  if (parentNode) {
    setBtns(parentNode, referenceNode, chain, mainAddress)
  }
}

export default genDecompileInDedaubBtn
