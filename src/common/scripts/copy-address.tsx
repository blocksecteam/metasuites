import { createRoot } from 'react-dom/client'
import isMobile from 'is-mobile'

import { CopyButton } from '@common/components'
import { pickAddress, getHrefQueryVariable } from '@common/utils'
import { PATTERN_EVM_TX_HASH } from '@common/constants'

const handleTargetElCopy = (el: HTMLElement, text: string) => {
  if (!isMobile()) {
    el.onmouseover = () => {
      const btnEl = el.querySelector<HTMLElement>(
        '.__metadock-copy-address-btn__'
      )
      if (btnEl) btnEl.style.display = 'inline-block'
    }
    el.onmouseout = () => {
      const btnEl = el.querySelector<HTMLElement>(
        '.__metadock-copy-address-btn__'
      )
      if (btnEl) btnEl.style.display = 'none'
    }
  }

  el.setAttribute('style', 'padding-right:18px;position:relative')
  const rootEl = document.createElement('span')
  rootEl.classList.add('__metadock-copy-address-btn__')
  rootEl.setAttribute(
    'style',
    `position:absolute;right:0;display:${isMobile() ? 'inline-block' : 'none'}`
  )
  el?.appendChild(rootEl)
  createRoot(rootEl).render(<CopyButton text={text} />)
}

export const handleAddressNodeListCopy = (
  addressTags: NodeListOf<HTMLElement> | HTMLElement[]
) => {
  for (let i = 0; i < addressTags.length; i++) {
    const el = addressTags[i]
    let address: string | undefined
    const href = el.getAttribute('href')
    const dataOriginalTitle = el.getAttribute('data-original-title')
    const title = el.getAttribute('title')
    if (href) {
      const tokenAddress = getHrefQueryVariable(href, 'a')
      address = tokenAddress ?? pickAddress(href)
    } else if (dataOriginalTitle) {
      address = pickAddress(dataOriginalTitle)
    } else if (title) {
      address = pickAddress(title)
    } else {
      address = pickAddress(el.innerText)
    }
    if (address) handleTargetElCopy(el, address)
  }
}

export const handleTokenNodeListCopy = (tokenTags: NodeListOf<HTMLElement>) => {
  for (let i = 0; i < tokenTags.length; i++) {
    const el = tokenTags[i]
    const href = el.getAttribute('href')
    if (!href) continue
    const address = getHrefQueryVariable(href, 'a') ?? pickAddress(href)
    if (address) handleTargetElCopy(el, address)
  }
}

export const handleTxnNodeListCopy = (
  txnTags: NodeListOf<HTMLElement> | HTMLElement[],
  targetPosition: 'self' | 'parent' = 'parent'
) => {
  for (let i = 0; i < txnTags.length; i++) {
    const el = txnTags[i]
    const href = el.getAttribute('href')
    if (!href) continue
    const txnHash = href.match(PATTERN_EVM_TX_HASH)?.[0]
    const hashTagEl = targetPosition === 'parent' ? el.parentElement : el
    if (hashTagEl && txnHash) {
      handleTargetElCopy(hashTagEl, txnHash)
    }
  }
}

export const handleBlockNodeListCopy = (blockTags: NodeListOf<HTMLElement>) => {
  for (let i = 0; i < blockTags.length; i++) {
    const el = blockTags[i]
    const href = el.getAttribute('href')
    if (!href) continue
    const block = el.innerText.trim()
    handleTargetElCopy(el, block)
  }
}
