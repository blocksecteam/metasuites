import '@common/styles/inject.common'
import { store } from '@src/store'
import { isAllowed, getChainSimpleName, getPageName } from '@common/utils'
import { ETHERSCAN_PAGES } from '@common/constants'

import {
  initAddressPageScript,
  initTxsPageScript,
  initAccountsPageScript,
  initTxPageScript,
  initBlockPageScript,
  initTokenPageScript,
  initTokentxnsPageScript,
  initBlocksPageScript,
  initTokenApprovalCheckerPageScript,
  initTxsInternalPageScript,
  initBlocksForkedPageScript
} from './page-scripts'

export const initEtherscanV1 = async () => {
  if (window.self !== window.top) {
    return // This page is embedded in an iframe
  }

  /** get user options */
  const supportWebList = await store.get('supportWebList')

  /** check whether the script is allowed to run on the current page  */
  const allowed = isAllowed(Object.values(supportWebList))

  /** get the necessary parameters required by the extension */
  const chain: string | undefined = getChainSimpleName()

  if (!allowed || !chain) return

  const pageName = getPageName()
  switch (pageName) {
    case ETHERSCAN_PAGES.ADDRESS.name:
      initAddressPageScript(chain)
      break
    case ETHERSCAN_PAGES.TX.name:
      initTxPageScript(chain)
      break
    case ETHERSCAN_PAGES.TXS.name:
      initTxsPageScript(chain)
      break
    case ETHERSCAN_PAGES.BLOCK.name:
      initBlockPageScript(chain)
      break
    case ETHERSCAN_PAGES.ACCOUNTS.name:
      initAccountsPageScript(chain)
      break
    case ETHERSCAN_PAGES.TOKEN.name:
      initTokenPageScript(chain)
      break
    case ETHERSCAN_PAGES.TOKENTXNS.name:
      initTokentxnsPageScript(chain)
      break
    case ETHERSCAN_PAGES.BLOCKS.name:
      initBlocksPageScript(chain)
      break
    case ETHERSCAN_PAGES.TOKEN_APPROVAL_CHECKER.name:
      initTokenApprovalCheckerPageScript(chain)
      break
    case ETHERSCAN_PAGES.TXS_INTERNAL.name:
      initTxsInternalPageScript(chain)
      break
    case ETHERSCAN_PAGES.BLOCKS_FORKED.name:
      initBlocksForkedPageScript(chain)
      break
  }
}
