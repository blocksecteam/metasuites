import '@common/styles/inject.common'
import { store } from '@src/store'
import { isAllowed, getPageName } from '@common/utils'
import { SOLANAEXPL_PAGES } from '@common/constants'

import { initAddressPageScript, initTxPageScript } from './page-scripts'

const execute = async () => {
  /** get user options */
  const supportWebList = await store.get('supportWebList')

  /** check whether the script is allowed to run on the current page  */
  const allowed = isAllowed(Object.values(supportWebList))

  if (!allowed) return

  const pageName = getPageName()

  switch (pageName) {
    case SOLANAEXPL_PAGES.ADDRESS.name:
      initAddressPageScript()
      break
    case SOLANAEXPL_PAGES.TX.name:
      initTxPageScript()
      break
  }
}

export default execute
