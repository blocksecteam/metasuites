import $ from 'jquery'
import React, { type ReactNode } from 'react'
import isMobile from 'is-mobile'
import { createRoot } from 'react-dom/client'

import { getHrefQueryVariable, pickAddress } from '@common/utils'
import { CopyButton } from '@common/components'

const appendIconToElement = (el: HTMLElement, reactNode: ReactNode) => {
  if (!isMobile()) {
    el.onmouseover = () => {
      const btnEls = el.querySelectorAll<HTMLElement>(
        '.__metadock-copy-address-btn__'
      )
      if (btnEls.length) {
        btnEls.forEach(btnEl => {
          btnEl.style.display = 'inline-block'
        })
      }
    }
    el.onmouseout = () => {
      const btnEls = el.querySelectorAll<HTMLElement>(
        '.__metadock-copy-address-btn__'
      )
      if (btnEls.length) {
        btnEls.forEach(btnEl => {
          btnEl.style.display = 'none'
        })
      }
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
  createRoot(rootEl).render(reactNode)
}

const handleAddressNodeListCopy = (
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
    if (address) appendIconToElement(el, <CopyButton text={address} />)
  }
}

const genCopyAddressBtn = async () => {
  const addressTags = $("a[href*='/btc/address' i]").toArray()
  handleAddressNodeListCopy(addressTags)
}

export default genCopyAddressBtn
