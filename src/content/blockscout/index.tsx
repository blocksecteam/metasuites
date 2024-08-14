import '@common/styles/inject.common'
import type { BlockscoutPageName } from '@common/constants'
import { BLOCKSCOUT_PAGES } from '@common/constants'
import { isAllowed, getChainSimpleName } from '@common/utils'
import { store } from '@src/store'
import allowlist from '@common/config/allowlist'

import { initTxPageScript, initAddressPageScript } from './page-scripts'
import { page } from './utils'
import './styles/index'

export class BlockscoutInitializer {
  static matches = allowlist.BLOCKSCOUT_MATCHES
  async init() {
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

    page.runScript((pageName: string) => {
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
}
