import { MSG_METADOCK_INSTALLED } from '@common/constants'
import allowlist from '@common/config/allowlist'

export class BlockSecInitializer {
  static matches = allowlist.BLOCKSEC_MATCHES
  init() {
    window.postMessage(MSG_METADOCK_INSTALLED)
  }
}
