import { store } from '@src/store'
import { MSG_MS_SUBSCRIPTION_INFO } from '@common/constants'
import allowlist from '@common/config/allowlist'

export class MetaSleuthInitializer {
  static matches = allowlist.MS_MATCHES
  init() {
    window.addEventListener('message', function (event) {
      const message = event.data
      if (message.type === MSG_MS_SUBSCRIPTION_INFO) {
        const token = localStorage.getItem('blocksec_token')
        if (token) {
          store.set('token', token.replace(/^"(.*)"$/, '$1'))
          window.location.assign(message.data.url)
        }
      }
    })
  }
}
