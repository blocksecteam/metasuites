import { MSG_METADOCK_INSTALLED } from '@common/constants'

const init = () => {
  window.postMessage(MSG_METADOCK_INSTALLED)
}

init()
