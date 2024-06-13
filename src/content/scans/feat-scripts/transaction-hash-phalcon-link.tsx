import React, { type ReactNode, type FC } from 'react'
import isMobile from 'is-mobile'
import { createRoot } from 'react-dom/client'

import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { CopyButton, IconPhalcon } from '@common/components'
import {
  ETHERSCAN_PAGES,
  PATTERN_EVM_TX_HASH,
  PHALCON_SUPPORT_LIST
} from '@common/constants'
import { validOrigin, getChainSimpleName } from '@common/utils'

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
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <CopyButton text={hash} style={{ color: '#ADB5BD' }} />
      <IconPhalcon
        mode="dark"
        style={{ verticalAlign: 'middle' }}
        onClick={handleClick}
      />
    </span>
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

  el.setAttribute(
    'style',
    'padding-right:40px;position:relative;max-width:11rem;'
  )
  const rootEl = document.createElement('span')
  rootEl.classList.add('__metadock-copy-address-btn__')
  rootEl.setAttribute(
    'style',
    `position:absolute;right:0;display:${
      isMobile() ? 'inline-block' : 'none'
    };line-height:0;top: 50%;transform: translateY(-50%)`
  )
  el?.appendChild(rootEl)
  createRoot(rootEl).render(reactNode)
}

const handleTxnNodeListCopy = (
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
      appendIconToElement(hashTagEl, <PhalconExplorerButton hash={txnHash} />)
    }
  }
}

const genTransactionHashPhalconLink = async (pageName: string) => {
  switch (pageName) {
    case ETHERSCAN_PAGES.TXS.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        '.hash-tag > a.myFnExpandBox_searchVal'
      )
      handleTxnNodeListCopy(txnTags)
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
            const iframeTxnTags = _document.querySelectorAll<HTMLElement>(
              '#maindiv table tbody tr td span.hash-tag a'
            )
            handleTxnNodeListCopy(iframeTxnTags)
          }
        },
        true
      )

      const dexTrackerIframe =
        document.querySelector<HTMLIFrameElement>('#dextrackeriframe')
      dexTrackerIframe?.addEventListener(
        'load',
        function () {
          const _document = dexTrackerIframe?.contentWindow?.document
          if (_document) {
            const iframeTxnTags = _document.querySelectorAll<HTMLElement>(
              '#body .table-responsive table tbody tr td:nth-of-type(1) a'
            )
            handleTxnNodeListCopy(iframeTxnTags)
          }
        },
        true
      )

      break
    }
    case ETHERSCAN_PAGES.ADDRESS.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        "a.hash-tag.myFnExpandBox_searchVal[href^='/tx/'], span.hash-tag > a[href^='/tx/']"
      )
      handleTxnNodeListCopy(txnTags, 'self')
      const internalTxnTags = document.querySelectorAll<HTMLElement>(
        "#ContentPlaceHolder1_divinternaltxtable table tbody tr td:nth-of-type(1) a.hash-tag[href^='/tx/']"
      )
      handleTxnNodeListCopy(internalTxnTags, 'self')

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
                  '.hash-tag.myFnExpandBox_searchVal > a'
                )
                // ERC-20 Token Txns / ERC-721 Token Txns
                const ercTokenTxns = _document.querySelectorAll<HTMLElement>(
                  ".table-responsive .table tr td:first-child .hash-tag > a[href^='/tx/']"
                )
                handleTxnNodeListCopy([...iframeTxnTags, ...ercTokenTxns])
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
        '.card tbody a.myFnExpandBox_searchVal'
      )
      handleTxnNodeListCopy(txnTags)
      break
    }
    case ETHERSCAN_PAGES.TOKEN_APPROVAL_CHECKER.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        'table#mytable tbody tr td:nth-of-type(1) a.hash-tag'
      )
      handleTxnNodeListCopy(txnTags, 'self')
      break
    }
  }
}

export default genTransactionHashPhalconLink
