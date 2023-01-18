import {
  handleAddressNodeListCopy,
  handleTokenNodeListCopy
} from '@common/scripts/copy-address'
import {
  SCAN_PAGES,
  type SCAN_PAGE_NAMES,
  TABLE_LIST_ADDRESS_SELECTORS
} from '@common/constants'
import { validOrigin } from '@common/utils'

/** show copy icon for addresses */
const genCopyAddressBtn = async (pageName: typeof SCAN_PAGE_NAMES[number]) => {
  switch (pageName) {
    case SCAN_PAGES.TXS.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        TABLE_LIST_ADDRESS_SELECTORS
      )
      handleAddressNodeListCopy(addressTags)
      break
    }
    case SCAN_PAGES.TOKEN.name:
    case SCAN_PAGES.ADDRESS.name: {
      const addressTags = document.querySelectorAll<HTMLElement>(
        TABLE_LIST_ADDRESS_SELECTORS
      )
      const iframes = document.querySelectorAll('iframe')
      handleAddressNodeListCopy(addressTags)
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
                handleAddressNodeListCopy(iframeAddressTags)
                handleTokenNodeListCopy(iframeTokenTags)
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
  }
}

export default genCopyAddressBtn
