import { ETHERSCAN_PAGES } from '@common/constants'
import { handleBlockNodeListCopy } from '@common/scripts/copy-address'

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
