import { createRoot } from 'react-dom/client'

import { pickAddress, isSupportEthervm } from '@common/utils'

import { DecompileInEthervmBtn, CopyByteCodeBtn } from '../components'

const setBtns = (
  parentNode: ParentNode,
  referenceNode: HTMLElement,
  chain: string,
  mainAddress: string
) => {
  /** Decompile in ethervm.io */
  const decompileBtnRootEl = document.createElement('div')
  decompileBtnRootEl.setAttribute(
    'style',
    'display:inline-block; vertical-align: middle'
  )
  decompileBtnRootEl.setAttribute('class', 'mb-1 mr-1')
  parentNode.insertBefore(decompileBtnRootEl, referenceNode)
  createRoot(decompileBtnRootEl).render(
    <DecompileInEthervmBtn chain={chain} mainAddress={mainAddress} />
  )
  /** copy source code */
  document
    .querySelector<HTMLElement>('#__metadock-copy-byte-code-btn__')
    ?.remove()
  const copyBtnRootEl = document.createElement('span')
  copyBtnRootEl.id = '__metadock-copy-byte-code-btn__'
  parentNode.insertBefore(copyBtnRootEl, referenceNode)
  createRoot(copyBtnRootEl).render(<CopyByteCodeBtn />)
}

/** Show quick open in ethervm.io for unverified contracts */
const genDecompileInEthervmBtn = (chain: string) => {
  if (!isSupportEthervm(chain)) return
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

export default genDecompileInEthervmBtn
