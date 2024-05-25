import '@common/styles/inject.common'
import { store } from '@src/store'
import { isAllowed, getPageName } from '@common/utils'
import { SOLANAFM_PAGES } from '@common/constants'

import { initAddressPageScript, initTxPageScript } from './page-scripts'

const execute = async () => {
  const supportWebList = await store.get('supportWebList')

  const allowed = isAllowed(Object.values(supportWebList))

  if (!allowed) return

  const pageName = getPageName()

  switch (pageName) {
    case SOLANAFM_PAGES.ADDRESS.name:
      initAddressPageScript()
      break
    case SOLANAFM_PAGES.TX.name:
      initTxPageScript()
      break
  }
}

export default execute
