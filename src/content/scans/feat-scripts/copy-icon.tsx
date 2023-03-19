import {
  handleAddressNodeListCopy,
  handleTokenNodeListCopy,
  handleTxnNodeListCopy,
  handleBlockNodeListCopy
} from '@common/scripts/copy-address'
import {
  SCAN_PAGES,
  type SCAN_PAGE_NAMES,
  TABLE_LIST_ADDRESS_SELECTORS
} from '@common/constants'
import { validOrigin } from '@common/utils'

/** show copy icon */
const genCopyIconBtn = async (pageName: (typeof SCAN_PAGE_NAMES)[number]) => {
  switch (pageName) {
    case SCAN_PAGES.TX.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        "#ContentPlaceHolder1_maintable > .row:nth-of-type(3) a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
    case SCAN_PAGES.TXS.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        TABLE_LIST_ADDRESS_SELECTORS
      )
      handleAddressNodeListCopy(addressTags)
      const txnTags = document.querySelectorAll<HTMLElement>(
        '.hash-tag > a.myFnExpandBox_searchVal'
      )
      handleTxnNodeListCopy(txnTags)
      const blockTags = document.querySelectorAll<HTMLElement>(
        ".card tbody a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
      break
    }
    case SCAN_PAGES.TOKEN.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        TABLE_LIST_ADDRESS_SELECTORS
      )
      handleAddressNodeListCopy(addressTags)
      const txnTags = document.querySelectorAll<HTMLElement>(
        '#maindiv table tbody tr td:nth-of-type(1) .hash-tag > a'
      )
      handleTxnNodeListCopy(txnTags)

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
    case SCAN_PAGES.ADDRESS.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        TABLE_LIST_ADDRESS_SELECTORS
      )
      handleAddressNodeListCopy(addressTags)
      const txnTags = document.querySelectorAll<HTMLElement>(
        "a.hash-tag.myFnExpandBox_searchVal[href^='/tx/'], span.hash-tag > a[href^='/tx/']"
      )
      handleTxnNodeListCopy(txnTags, 'self')
      const internalTxnTags = document.querySelectorAll<HTMLElement>(
        "#ContentPlaceHolder1_divinternaltxtable table tbody tr td:nth-of-type(1) a.hash-tag[href^='/tx/']"
      )
      handleTxnNodeListCopy(internalTxnTags, 'self')
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
                    "a.hash-tag[href^='/address/'], span.hash-tag[title*='0x' i]"
                  )
                const iframeTokenTags = _document.querySelectorAll<HTMLElement>(
                  "a[href^='/token/0x' i][href*='a=0x' i]:not([data-original-title])"
                )
                const iframeTxnTags = _document.querySelectorAll<HTMLElement>(
                  '.hash-tag.myFnExpandBox_searchVal > a'
                )
                // ERC-20 Token Txns / ERC-721 Token Txns
                const ercTokenTxns = _document.querySelectorAll<HTMLElement>(
                  ".table-responsive .table tr td:first-child .hash-tag > a[href^='/tx/']"
                )
                handleAddressNodeListCopy(iframeAddressTags)
                handleTokenNodeListCopy(iframeTokenTags)
                handleTxnNodeListCopy([...iframeTxnTags, ...ercTokenTxns])
              }
            },
            true
          )
        }
      }
      break
    }
    case SCAN_PAGES.TOKENTXNS.name: {
      const tokenTags = document.querySelectorAll<HTMLElement>(
        ".card tbody a[href^='/token/0x' i]:not([class])"
      )
      const addressTags = document.querySelectorAll<HTMLElement>(
        TABLE_LIST_ADDRESS_SELECTORS
      )
      const txnTags = document.querySelectorAll<HTMLElement>(
        '.card tbody a.myFnExpandBox_searchVal'
      )
      handleTxnNodeListCopy(txnTags)
      handleAddressNodeListCopy(addressTags)
      handleTokenNodeListCopy(tokenTags)
      break
    }
    case SCAN_PAGES.ACCOUNTS.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        ".card tbody a[href^='/address/0x' i]"
      )
      handleAddressNodeListCopy(addressTags)
      break
    }
    case SCAN_PAGES.TOKEN_APPROVAL_CHECKER.name: {
      const txnTags = document.querySelectorAll<HTMLElement>(
        'table#mytable tbody tr td:nth-of-type(1) a.hash-tag'
      )
      const blockTags = document.querySelectorAll<HTMLElement>(
        "table#mytable tbody a[href^='/block/']"
      )
      handleTxnNodeListCopy(txnTags, 'self')
      handleBlockNodeListCopy(blockTags)
      break
    }
  }
}

export default genCopyIconBtn
