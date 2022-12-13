import '@common/styles/inject.common'
import { store, type OptWebsite } from '@src/store'
import { isAllowed, getChainSimpleName, getScanPageName } from '@common/utils'
import { SCAN_PAGES } from '@common/constants'

import {
  initAddressPageScript,
  initTxsPageScript,
  initAccountsPageScript,
  initTxPageScript,
  initBlockPageScript,
  initTokenPageScript,
  initTokentxnsPageScript,
  initBlocksPageScript
} from './page-scripts'

const init = async () => {
  /** get user options */
  const { supportWebList } = await store.get('options')

  /** check whether the script is allowed to run on the current page  */
  const allowed = isAllowed(supportWebList as OptWebsite[])

  /** get the necessary parameters required by the extension */
  const chain: string | undefined = getChainSimpleName()

  if (!allowed || !chain) return

  const pageName = getScanPageName()

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
      initBlockPageScript()
      break
    case SCAN_PAGES.ACCOUNTS.name:
      initAccountsPageScript()
      break
    case SCAN_PAGES.TOKEN.name:
      initTokenPageScript(chain)
      break
    case SCAN_PAGES.TOKENTXNS.name:
      initTokentxnsPageScript(chain)
      break
    case SCAN_PAGES.BLOCKS.name:
      initBlocksPageScript()
      break
  }
}

init()
