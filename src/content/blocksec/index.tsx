import { MSG_METADOCK_INSTALLED } from '@common/constants'

export const initBlockSec = () => {
  window.postMessage(MSG_METADOCK_INSTALLED)
}
