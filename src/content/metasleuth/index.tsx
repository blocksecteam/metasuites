import { store } from '@src/store'
import { MSG_MS_SUBSCRIPTION_INFO } from '@common/constants'
import allowlist from '@common/config/allowlist'
import { SLEUTH_DOMAIN } from '@common/config/uri'

import { getReturnUrl, isMessageObject, parseToken } from './validation'

export class MetaSleuthInitializer {
  static matches = allowlist.MS_MATCHES
  init() {
    if (window.location.origin !== new URL(SLEUTH_DOMAIN).origin) return

    let saving = false
    window.addEventListener('message', async function (event) {
      if (
        saving ||
        event.source !== window ||
        event.origin !== window.location.origin
      ) {
        return
      }

      const message: unknown = event.data
      if (
        !isMessageObject(message) ||
        message.type !== MSG_MS_SUBSCRIPTION_INFO ||
        !isMessageObject(message.data)
      ) {
        return
      }

      const returnUrl = getReturnUrl(message.data.url)
      if (!returnUrl) return

      try {
        const token = parseToken(localStorage.getItem('blocksec_token'))
        if (!token) return

        saving = true
        await store.set('token', token)
        // ChromeStorage does not reject on runtime.lastError; verify by reading back.
        if ((await store.get('token')) === token) {
          window.location.assign(returnUrl)
        }
      } catch (error) {
        console.error('MetaSleuth token sync failed', error)
      } finally {
        saving = false
      }
    })
  }
}
