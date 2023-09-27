import { MSG_METADOCK_INSTALLED } from '@common/constants'

export const initBlocksec = () => {
  window.postMessage(MSG_METADOCK_INSTALLED)
}
