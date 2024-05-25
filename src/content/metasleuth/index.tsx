import { store } from '@src/store'
import { MSG_MS_SUBSCRIPTION_INFO } from '@common/constants'

export const initMetaSleuth = () => {
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
