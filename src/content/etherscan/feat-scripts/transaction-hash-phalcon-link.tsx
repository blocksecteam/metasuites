import { ETHERSCAN_PAGES } from '@common/constants'
import { validOrigin } from '@common/utils'
import { handleTxnNodeListCopy } from '@common/scripts/copy-address'

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
      handleTxnNodeListCopy(txnTags, 'self')
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
      handleTxnNodeListCopy(txnTags, 'self')
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
