import '@common/styles/inject.common'
import type { BlockscoutPageName } from '@common/constants'
import { BLOCKSCOUT_PAGES } from '@common/constants'
import { isAllowed, getChainSimpleName, getPageName } from '@common/utils'
import { store } from '@src/store'
import { initTxPageScript, initAddressPageScript } from './page-scripts'
import './styles/index'
import { page } from './utils'

export const initBlockscout = async () => {
  if (window.self !== window.top) {
    return // This page is embedded in an iframe
  }
  /** get user options */
  const supportWebList = await store.get('supportWebList')

  /** check whether the script is allowed to run on the current page  */
  const allowed = isAllowed(Object.values(supportWebList))

  /** get the necessary parameters required by the extension */
  const chain: string | undefined = getChainSimpleName()

  console.log('__>__', { supportWebList, allowed, chain })

  if (!allowed || !chain) return

  page.runScript((pageName: string) => {
    console.log('__>__', { pageName })

    switch (pageName) {
      case BLOCKSCOUT_PAGES.TX.name: {
        const { pattern } = BLOCKSCOUT_PAGES[pageName as BlockscoutPageName]
        const [, txHash] = window.location.pathname.match(pattern) || []

        if (!txHash) return

        const tab = new URL(window.location.href).searchParams.get('tab')

        if (!(tab === null || tab === 'index')) return

        initTxPageScript(chain, txHash)
        break
      }
      case BLOCKSCOUT_PAGES.ADDRESS.name: {
        const { pattern } = BLOCKSCOUT_PAGES[pageName as BlockscoutPageName]
        const [, addressHash] = window.location.pathname.match(pattern) || []

        if (!addressHash) return

        initAddressPageScript(chain, addressHash)
        break
      }
    }
  })
}
