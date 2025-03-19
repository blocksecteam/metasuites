import { MSG_METADOCK_INSTALLED } from '@common/constants'
import allowlist from '@common/config/allowlist'

import { initPrivateLabelsSync } from './private-labels'

export class BlockSecInitializer {
  static matches = allowlist.BLOCKSEC_MATCHES
  init() {
    window.postMessage(MSG_METADOCK_INSTALLED)

    if (window.self === window.top) {
      initPrivateLabelsSync()
    }
  }
}
