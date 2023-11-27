import { ETHERSCAN_PAGES } from '@common/constants'
import { validOrigin } from '@common/utils'
import {
  handleBlockNodeListCopy,
  handleTxnNodeListCopy
} from '@common/scripts/copy-address'

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
      const txnTags = document.querySelectorAll<HTMLElement>(
        "#ContentPlaceHolder1_divTransactions table tbody tr td:nth-of-type(2) a[href^='/tx/']"
      )
      handleBlockNodeListCopy(blockTags)
      handleTxnNodeListCopy(txnTags)
      break
    }
    case ETHERSCAN_PAGES.TOKEN.name:
    case ETHERSCAN_PAGES.ADDRESS.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        ".card tbody a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
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
    case ETHERSCAN_PAGES.BLOCKS_FORKED.name:
    case ETHERSCAN_PAGES.BLOCKS.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        ".card tbody > tr > td > a[href^='/block/']"
      )
      handleBlockNodeListCopy(blockTags)
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
      const blockTags = document.querySelectorAll<HTMLElement>(
        "table#mytable tbody a[href^='/block/']"
      )
      handleTxnNodeListCopy(txnTags)
      handleBlockNodeListCopy(blockTags)
      break
    }
    case ETHERSCAN_PAGES.TXS_INTERNAL.name: {
      const blockTags = document.querySelectorAll<HTMLElement>(
        ".table-responsive table td a[href^='/block/']"
      )
      const txnTags = document.querySelectorAll<HTMLElement>(
        ".table-responsive table tbody tr td a.hash-tag[href^='/tx/']"
      )
      handleBlockNodeListCopy(blockTags)
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

export default genCopyIconBtn
