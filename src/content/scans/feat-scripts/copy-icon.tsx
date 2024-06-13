import React, { type ReactNode } from 'react'
import isMobile from 'is-mobile'
import { createRoot } from 'react-dom/client'

import {
  ETHERSCAN_PAGES,
  TABLE_LIST_ADDRESS_SELECTORS
} from '@common/constants'
import { validOrigin, getHrefQueryVariable, pickAddress } from '@common/utils'
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

const handleTokenNodeListCopy = (tokenTags: NodeListOf<HTMLElement>) => {
  for (let i = 0; i < tokenTags.length; i++) {
    const el = tokenTags[i]
    const href = el.getAttribute('href')
    if (!href) continue
    const address = getHrefQueryVariable(href, 'a') ?? pickAddress(href)
    if (address) appendIconToElement(el, <CopyButton text={address} />)
  }
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

export const handleBlockNodeListCopy = (blockTags: NodeListOf<HTMLElement>) => {
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
        "#ContentPlaceHolder1_maintable .row:nth-of-type(3) a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
    case ETHERSCAN_PAGES.TXS.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        TABLE_LIST_ADDRESS_SELECTORS
      )
      handleAddressNodeListCopy(addressTags)
      const blockTags = document.querySelectorAll<HTMLElement>(
        ".card tbody a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
    case ETHERSCAN_PAGES.TOKEN.name: {
      const tokenTxnsIframe =
        document.querySelector<HTMLIFrameElement>('#tokentxnsiframe')
      tokenTxnsIframe?.addEventListener(
        'load',
        function () {
          const _document = tokenTxnsIframe?.contentWindow?.document
          if (_document) {
            const iframeAddressTags = _document.querySelectorAll<HTMLElement>(
              '#maindiv table tbody tr td a.hash-tag, #maindiv table tbody tr td span.hash-tag'
            )
            handleAddressNodeListCopy(iframeAddressTags)
            const iframeBlockTags = _document.querySelectorAll<HTMLElement>(
              "#maindiv table tbody tr td a[href^='/block/']"
            )
            handleBlockNodeListCopy(iframeBlockTags)
          }
        },
        true
      )

      const tokenHoldersIframe =
        document.querySelector<HTMLIFrameElement>('#tokeholdersiframe')
      tokenHoldersIframe?.addEventListener(
        'load',
        function () {
          const _document = tokenHoldersIframe?.contentWindow?.document
          if (_document) {
            const iframeTokenTags = _document.querySelectorAll<HTMLElement>(
              '#maintable table tbody tr td:nth-of-type(2) a'
            )
            handleTokenNodeListCopy(iframeTokenTags)
          }
        },
        true
      )
      break
    }
    case ETHERSCAN_PAGES.ADDRESS.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        TABLE_LIST_ADDRESS_SELECTORS
      )
      handleAddressNodeListCopy(addressTags)
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
                const iframeAddressTags =
                  _document.querySelectorAll<HTMLElement>(
                    "a.hash-tag[href^='/address/'], span.hash-tag"
                  )
                handleAddressNodeListCopy(iframeAddressTags)
                const iframeTokenTags = _document.querySelectorAll<HTMLElement>(
                  "a[href^='/token/0x' i][href*='a=0x' i]:not([data-original-title])"
                )
                handleTokenNodeListCopy(iframeTokenTags)
                const iframeBlockTags =
                  _document.querySelectorAll<HTMLElement>("a[href^='/block/']")
                handleBlockNodeListCopy(iframeBlockTags)
              }
            },
            true
          )
        }
      }
      break
    }
    case ETHERSCAN_PAGES.TOKENTXNS.name: {
      const tokenTags = document.querySelectorAll<HTMLElement>(
        ".card tbody a[href^='/token/0x' i]:not([class])"
      )
      const addressTags = document.querySelectorAll<HTMLElement>(
        TABLE_LIST_ADDRESS_SELECTORS
      )
      handleAddressNodeListCopy(addressTags)
      handleTokenNodeListCopy(tokenTags)
      break
    }
    case ETHERSCAN_PAGES.ACCOUNTS.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        ".card tbody a[href^='/address/0x' i]"
      )
      handleAddressNodeListCopy(addressTags)
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
    case ETHERSCAN_PAGES.BLOCKS_FORKED.name:
    case ETHERSCAN_PAGES.BLOCKS.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        ".card tbody > tr > td > a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
  }
}

export default genCopyIconBtn
