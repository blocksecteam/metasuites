import {
  handleAddressNodeListCopy,
  handleTxnNodeListCopy
} from '@common/scripts/copy-address'
import { ETHERSCAN_PAGES } from '@common/constants'
import { validOrigin } from '@common/utils'

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
    case ETHERSCAN_PAGES.ACCOUNTS.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        ".card tbody a[href^='/address/0x' i]"
      )
      handleAddressNodeListCopy(addressTags)
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
