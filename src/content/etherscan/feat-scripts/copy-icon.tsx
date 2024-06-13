import React, { type ReactNode } from 'react'
import isMobile from 'is-mobile'
import { createRoot } from 'react-dom/client'

import { ETHERSCAN_PAGES } from '@common/constants'
import { CopyButton } from '@common/components'
import { validOrigin } from '@common/utils'

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

const handleBlockNodeListCopy = (blockTags: NodeListOf<HTMLElement>) => {
  for (let i = 0; i < blockTags.length; i++) {
    const el = blockTags[i]
    const href = el.getAttribute('href')
    if (!href) continue
    el.classList.remove('hash-tag')
    const block = el.innerText.trim()
    appendIconToElement(el, <CopyButton text={block} />)
  }
}

/** show copy icon */
const genCopyIconBtn = async (pageName: string) => {
  switch (pageName) {
    case ETHERSCAN_PAGES.TX.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        "#ContentPlaceHolder1_maintable > div.card:first-child >.row:nth-of-type(3) a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
    case ETHERSCAN_PAGES.TXS.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        "#ContentPlaceHolder1_divTransactions table td a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
    case ETHERSCAN_PAGES.TOKEN.name:
    case ETHERSCAN_PAGES.ADDRESS.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        ".card tbody a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      const iframes = document.querySelectorAll('iframe')
      for (let i = 0; i < iframes.length; ++i) {
        const iframe = iframes[i]
        if (validOrigin(iframe.src)) {
          iframe.addEventListener(
            'load',
            function () {
              const _document = iframe?.contentWindow?.document
              if (_document) {
                const iframeBlockTags = _document.querySelectorAll<HTMLElement>(
                  ".table-responsive table tbody a[href^='/block/']"
                )
                handleBlockNodeListCopy(iframeBlockTags)
              }
            },
            true
          )
        }
      }
      break
    }
    case ETHERSCAN_PAGES.BLOCKS_FORKED.name:
    case ETHERSCAN_PAGES.BLOCKS.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        ".card tbody > tr > td > a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
    case ETHERSCAN_PAGES.TOKEN_APPROVAL_CHECKER.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        "table#mytable tbody a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
    case ETHERSCAN_PAGES.TXS_INTERNAL.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        ".table-responsive table td a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
  }
}

export default genCopyIconBtn
