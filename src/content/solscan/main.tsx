import '@common/styles/inject.common'
import { store } from '@src/store'
import { isAllowed, getPageName } from '@common/utils'
import { SOLSCAN_PAGES } from '@common/constants'

import {
  initAccountPageScript,
  initTxPageScript,
  initTokenPageScript
} from './page-scripts'

const execute = async () => {
  const supportWebList = await store.get('supportWebList')

  const allowed = isAllowed(Object.values(supportWebList))

  if (!allowed) return

  const pageName = getPageName()

  switch (pageName) {
    case SOLSCAN_PAGES.ACCOUNT.name:
      initAccountPageScript()
      break
    case SOLSCAN_PAGES.TOKEN.name:
      initTokenPageScript()
      break
    case SOLSCAN_PAGES.TX.name:
      initTxPageScript()
      break
  }
}

export default execute
