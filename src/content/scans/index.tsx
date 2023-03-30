import '@common/styles/inject.common'
import { store, type OptWebsite } from '@src/store'
import { isAllowed, getChainSimpleName, getPageName } from '@common/utils'
import { SCAN_PAGES } from '@common/constants'

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
  initTxsInternalPageScript
} from './page-scripts'

const init = async () => {
  if (window.self !== window.top) {
    return // This page is embedded in an iframe
  }

  /** get user options */
  const { supportWebList } = await store.get('options')

  /** check whether the script is allowed to run on the current page  */
  const allowed = isAllowed(supportWebList as OptWebsite[])

  /** get the necessary parameters required by the extension */
  const chain: string | undefined = getChainSimpleName()

  if (!allowed || !chain) return

  const pageName = getPageName()

  switch (pageName) {
    case SCAN_PAGES.ADDRESS.name:
      initAddressPageScript(chain)
      break
    case SCAN_PAGES.TX.name:
      initTxPageScript(chain)
      break
    case SCAN_PAGES.TXS.name:
      initTxsPageScript(chain)
      break
    case SCAN_PAGES.BLOCK.name:
      initBlockPageScript(chain)
      break
    case SCAN_PAGES.ACCOUNTS.name:
      initAccountsPageScript(chain)
      break
    case SCAN_PAGES.TOKEN.name:
      initTokenPageScript(chain)
      break
    case SCAN_PAGES.TOKENTXNS.name:
      initTokentxnsPageScript(chain)
      break
    case SCAN_PAGES.BLOCKS.name:
      initBlocksPageScript(chain)
      break
    case SCAN_PAGES.TOKEN_APPROVAL_CHECKER.name:
      initTokenApprovalCheckerPageScript(chain)
      break
    case SCAN_PAGES.TXS_INTERNAL.name:
      initTxsInternalPageScript(chain)
      break
  }
}

init()
