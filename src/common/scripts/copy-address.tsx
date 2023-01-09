import { createRoot } from 'react-dom/client'

import { CopyButton } from '@common/components'
import { pickAddress, getHrefQueryVariable } from '@common/utils'

const handleAddressOrTokenElCopy = (el: HTMLElement, address: string) => {
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
  el.setAttribute('style', 'padding-right:18px;position:relative')
  const rootEl = document.createElement('span')
  rootEl.classList.add('__metadock-copy-address-btn__')
  rootEl.setAttribute('style', 'position:absolute;right:0;display:none')
  el?.appendChild(rootEl)
  createRoot(rootEl).render(<CopyButton text={address} />)
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
    }
    if (address) handleAddressOrTokenElCopy(el, address)
  }
}

export const handleTokenNodeListCopy = (tokenTags: NodeListOf<HTMLElement>) => {
  for (let i = 0; i < tokenTags.length; i++) {
    const el = tokenTags[i]
    const href = el.getAttribute('href')
    if (!href) continue
    const address = pickAddress(href)
    if (address) handleAddressOrTokenElCopy(el, address)
  }
}
