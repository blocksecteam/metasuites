import { getPageName } from '@common/utils'
import type { BlockscoutPageName } from '@src/common/constants'
import { BLOCKSCOUT_PAGES } from '@src/common/constants'

export const waitUntilDataLoaded = (
  selectors: Array<string>
): Promise<boolean> => {
  return new Promise(resolve => {
    const intervalId = window.setInterval(() => {
      const isAllDepsLoaded = selectors.every(
        selector =>
          window.document
            .querySelector(selector)
            ?.getAttribute('data-ready') === 'true'
      )

      if (isAllDepsLoaded) {
        window.clearInterval(intervalId)
        resolve(true)
      }
    }, 2_000)

    window.setTimeout(() => {
      window.clearInterval(intervalId)
      resolve(false)
    }, 20_000)
  })
}

export const runScript = (cb: (pageName: string) => void) => {
  const pageName = getPageName()

  pageName && cb(pageName)

  window.addEventListener(
    'message',
    event => {
      if (event.origin !== window.location.origin) return
      if (event.data.source !== 'APP_ROUTER') return

      const pageName = getPageName()

      if (!pageName) return

      const { routerEvents } = BLOCKSCOUT_PAGES[pageName as BlockscoutPageName]
      if (routerEvents.includes(event.data.type)) cb(pageName)

      return
    },
    false
  )
}
