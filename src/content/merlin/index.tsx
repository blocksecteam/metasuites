import '@common/styles/inject.common'
import { store } from '@src/store'
import { isAllowed, getPageName } from '@common/utils'
import { MERLINSCAN_PAGES } from '@common/constants'

import { initTxPageScript } from './page-scripts'

export const initMerlin = async () => {
  if (window.self !== window.top) {
    return
  }

  /** get user options */
  const supportWebList = await store.get('supportWebList')

  /** check whether the script is allowed to run on the current page  */
  const allowed = isAllowed(Object.values(supportWebList))

  if (!allowed) return

  const pageName = getPageName()

  switch (pageName) {
    case MERLINSCAN_PAGES.TX.name:
      initTxPageScript()
      break
  }
}
