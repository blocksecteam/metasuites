import '@common/styles/inject.common'

import allowlist from '@common/config/allowlist'

import { store } from '@src/store'
import { isAllowed, getChainSimpleName } from '@common/utils'
import {
  genEnhancedLabels,
  genMainAddressLabel,
  genCopyAddressBtn
} from '@src/content/btc/feat-scripts'

export class BTCInitializer {
  static matches = allowlist.BTC_EXPLORER_MATCHES
  async init() {
    const { enhancedLabels, showCopyIcon } = await store.get('options')
    const supportWebList = await store.get('supportWebList')

    const allowed = isAllowed(Object.values(supportWebList))

    const chain: string | undefined = getChainSimpleName()

    if (!allowed || !chain) return

    if (enhancedLabels) {
      genEnhancedLabels(chain)
      genMainAddressLabel(chain)
    }

    if (showCopyIcon) genCopyAddressBtn()
  }
}
