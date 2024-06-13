import React, { type FC, type ReactNode } from 'react'
import isMobile from 'is-mobile'
import { createRoot } from 'react-dom/client'

import {
  ETHERSCAN_PAGES,
  PATTERN_EVM_TX_HASH,
  PHALCON_SUPPORT_LIST
} from '@common/constants'
import {
  validOrigin,
  getChainSimpleName,
  hasSiblingWithClass
} from '@common/utils'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { IconPhalcon } from '@common/components'

const PhalconExplorerButton: FC<{ hash: string }> = ({ hash }) => {
  const chain = getChainSimpleName()

  const pathname = PHALCON_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault()
    window.open(`${PHALCON_EXPLORER_DOMAIN}/tx/${pathname}/${hash}`, '_blank')
  }

  if (!chain) return null
  return (
    <IconPhalcon
      mode="dark"
      style={{ verticalAlign: 'middle' }}
      onClick={handleClick}
    />
  )
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

  el.setAttribute(
    'style',
    'padding-right:18px;position:relative;width:fit-content;'
  )

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

const handleTxnNodeListCopy = (
  txnTags: NodeListOf<HTMLElement> | HTMLElement[]
) => {
  for (let i = 0; i < txnTags.length; i++) {
    const el = txnTags[i]
    const href = el.getAttribute('href')
    if (!href) continue
    const txnHash = href.match(PATTERN_EVM_TX_HASH)?.[0]
    let targetEl: HTMLElement | null = null
    if (!el.parentElement) return
    if (hasSiblingWithClass(el, 'js-clipboard')) {
      targetEl = el.parentElement
    } else if (hasSiblingWithClass(el.parentElement, 'js-clipboard')) {
      targetEl = el.parentElement.parentElement
    }
    if (targetEl && txnHash) {
      appendIconToElement(targetEl, <PhalconExplorerButton hash={txnHash} />)
    }
  }
}

const genTransactionHashPhalconLink = async (pageName: string) => {
  switch (pageName) {
    case ETHERSCAN_PAGES.TXS.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        "#ContentPlaceHolder1_divTransactions table tbody tr td:nth-of-type(2) a[href^='/tx/']"
      )
      handleTxnNodeListCopy(txnTags)
      break
    }
    case ETHERSCAN_PAGES.TOKEN.name:
    case ETHERSCAN_PAGES.ADDRESS.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        '.card table tbody a.myFnExpandBox_searchVal'
      )
      handleTxnNodeListCopy(txnTags)
      const pendingTxnTags = document.querySelectorAll<HTMLElement>(
        ".card table tbody span.myFnExpandBox_searchVal > a[href^='/tx/']"
      )
      handleTxnNodeListCopy(pendingTxnTags)
      const iframes = document.querySelectorAll('iframe')
      for (let i = 0; i < iframes.length; ++i) {
        const iframe = iframes[i]
        if (validOrigin(iframe.src)) {
          iframe.addEventListener(
            'load',
            function () {
              const _document = iframe?.contentWindow?.document
              if (_document) {
                const iframeTxnTags = _document.querySelectorAll<HTMLElement>(
                  ".table-responsive table tbody a.myFnExpandBox_searchVal, .table-responsive table tbody span.myFnExpandBox_searchVal > a[href*='tx/']"
                )
                handleTxnNodeListCopy(iframeTxnTags)
                //TODO: token
              }
            },
            true
          )
        }
      }
      break
    }
    case ETHERSCAN_PAGES.TOKENTXNS.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        ".table-responsive table tbody a.myFnExpandBox_searchVal, .table-responsive table tbody span.myFnExpandBox_searchVal > a[href*='tx/']"
      )
      handleTxnNodeListCopy(txnTags)
      break
    }
    case ETHERSCAN_PAGES.TOKEN_APPROVAL_CHECKER.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        'table.dataTable tbody tr td:nth-of-type(1) a.hash-tag'
      )
      handleTxnNodeListCopy(txnTags)
      break
    }
    case ETHERSCAN_PAGES.TXS_INTERNAL.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        ".table-responsive table tbody tr td a.hash-tag[href^='/tx/']"
      )
      handleTxnNodeListCopy(txnTags)
      break
    }
    case ETHERSCAN_PAGES.NFT_TRANSFERS.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        "table#datatable tbody a.myFnExpandBox_searchVal, table#datatable tbody span.myFnExpandBox_searchVal > a[href*='tx/']"
      )
      handleTxnNodeListCopy(txnTags)
      break
    }
  }
}

export default genTransactionHashPhalconLink
