import '@common/styles/inject.common'
import { store } from '@src/store'
import {
  isAllowed,
  getPageName,
  getHrefQueryVariable,
  getChainSimpleName
} from '@common/utils'
import { ETHERSCAN_PAGES, EXT_SUPPORT_WEB_LIST } from '@common/constants'

import {
  initTxPageScript,
  initAddressPageScript,
  initTokenPageScript
} from './page-scripts'

const runScript = async () => {
  const supportWebList = await store.get('supportWebList')

  const allowed = isAllowed(Object.values(supportWebList))
  const chain: string | undefined = getChainSimpleName()
  if (!allowed || !chain) return

  const chainId = getHrefQueryVariable(window.location.href, 'chainId')
  if (
    chainId &&
    EXT_SUPPORT_WEB_LIST.flatMap(item => [
      item,
      ...(item.testNets || [])
    ]).findIndex(item => item.chainID === Number(chainId)) === -1
  ) {
    return
  }

  const pageName = getPageName()

  switch (pageName) {
    case ETHERSCAN_PAGES.TX.name:
      initTxPageScript(chain)
      break
    case ETHERSCAN_PAGES.ADDRESS.name:
      initAddressPageScript(chain)
      break
    case ETHERSCAN_PAGES.TOKEN.name:
      initTokenPageScript(chain)
      break
  }
}

export default runScript
