import React, { type FC, type ReactNode } from 'react'
import isMobile from 'is-mobile'
import { createRoot } from 'react-dom/client'

import { PHALCON_SUPPORT_LIST } from '@common/constants'
import { getChainSimpleName } from '@common/utils'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { IconPhalcon } from '@common/components'

const Icon: FC<{ hash: string }> = ({ hash }) => {
  const chain = getChainSimpleName()

  const pathname = PHALCON_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault()
    window.open(`${PHALCON_EXPLORER_DOMAIN}/tx/${pathname}/${hash}`, '_blank')
  }

  if (!chain) return null
  return <IconPhalcon mode="dark" onClick={handleClick} />
}

const appendIconToElement = (el: HTMLElement, reactNode: ReactNode) => {
  if (!isMobile()) {
    el.onmouseover = () => {
      const btnEls = el.querySelectorAll<HTMLElement>(
        '.__metadock-copy-address-btn__'
      )
      if (btnEls.length) {
        btnEls.forEach(btnEl => {
          btnEl.style.display = 'inline-flex'
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

  el.setAttribute('style', 'padding-right:20px;position:relative;')

  const rootEl = document.createElement('span')
  rootEl.classList.add('__metadock-copy-address-btn__')
  rootEl.setAttribute(
    'style',
    `position:absolute;right:0;display:${
      isMobile() ? 'inline-flex' : 'none'
    };top: 50%;transform: translateY(-50%)`
  )
  el?.appendChild(rootEl)
  createRoot(rootEl).render(reactNode)
}

const renderTransactionHashPhalconLink = async () => {
  const txnTags = document.querySelectorAll<HTMLElement>(
    "table a[href^='/tx/']"
  )
  console.log('txnTags', txnTags)
  for (let i = 0; i < txnTags.length; i++) {
    const el = txnTags[i]
    const href = el.getAttribute('href')
    if (!href) continue
    const txnHash = href.substring(href.lastIndexOf('/') + 1)
    let targetEl: HTMLElement | null = null
    if (!el.parentElement) return
    targetEl = el.parentElement.parentElement
    if (targetEl && txnHash) {
      appendIconToElement(targetEl, <Icon hash={txnHash} />)
    }
  }
}

export default renderTransactionHashPhalconLink
