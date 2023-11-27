import '@common/styles/inject.common'
import { store } from '@src/store'
import { isAllowed, getPageName } from '@common/utils'
import { TRONSCAN_PAGES } from '@common/constants'

import {
  initAddressPageScript,
  initTxPageScript,
  initContractPageScript,
  initBlockPageScript,
  initTokenPageScript,
  initAdvancedFilterPageScript
} from './page-scripts'

const runScript = async () => {
  /** get user options */
  const supportWebList = await store.get('supportWebList')

  /** check whether the script is allowed to run on the current page  */
  const allowed = isAllowed(Object.values(supportWebList))

  if (!allowed) return

  const pageName = getPageName(window.location.hash.substring(1))
  switch (pageName) {
    case TRONSCAN_PAGES.ADDRESS.name:
      initAddressPageScript()
      break
    case TRONSCAN_PAGES.TX.name:
      initTxPageScript()
      break
    case TRONSCAN_PAGES.CONTRACT.name:
      initContractPageScript()
      break
    case TRONSCAN_PAGES.BLOCK.name:
      initBlockPageScript()
      break
    case TRONSCAN_PAGES.TOKEN.name:
      initTokenPageScript()
      break
    case TRONSCAN_PAGES.ADVANCED_FILTER.name:
      initAdvancedFilterPageScript()
      break
  }
}

export default runScript
