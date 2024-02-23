import $ from 'jquery'
import { getPageName } from '@common/utils'
import type { BlockscoutPageName } from '@src/common/constants'
import { BLOCKSCOUT_PAGES } from '@src/common/constants'

export const waitUntilDataLoaded = (
  selectors: Array<string>
): Promise<boolean> => {
  return new Promise(resolve => {
    const intervalId = window.setInterval(() => {
      const deps: Array<JQuery<HTMLElement>> = selectors.map(selector =>
        $(selector)
      )
      const isAllDepsLoaded = deps.every(
        dep => String(dep.data('ready')) === 'true'
      )

      console.log('__>__ status: ', isAllDepsLoaded)
      console.log(
        '__>__ flags: ',
        deps.map(dep => dep.data('ready'))
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
