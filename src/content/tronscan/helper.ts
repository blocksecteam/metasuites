import $ from 'jquery'

export const lazyLoad = (
  callback: () => void,
  inspector = '#mainContent #loadingVideo',
  timeout = 30000
) => {
  const waitForMainContent = (): Promise<void> => {
    return new Promise(resolve => {
      const check = () => {
        if ($('#mainContent').length) {
          resolve()
          return
        }

        const observer = new MutationObserver(() => {
          if ($('#mainContent').length) {
            observer.disconnect()
            resolve()
          }
        })

        observer.observe(document.body, {
          childList: true,
          subtree: true
        })
      }

      check()
    })
  }

  const waitForLoadingToDisappear = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      let timeoutId: NodeJS.Timeout | null = null
      let observer: MutationObserver | null = null

      const cleanup = () => {
        if (observer) {
          observer.disconnect()
          observer = null
        }
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
      }

      const checkAndResolve = () => {
        if (!$(inspector).length) {
          cleanup()
          resolve()
          return true
        }
        return false
      }

      // Check immediately
      if (checkAndResolve()) return

      // Setup timeout
      timeoutId = setTimeout(() => {
        cleanup()
        reject(
          new Error(
            `Loading element "${inspector}" did not disappear within ${timeout}ms`
          )
        )
      }, timeout)

      // Setup MutationObserver to watch for changes
      observer = new MutationObserver(() => {
        checkAndResolve()
      })

      const mainContent = document.querySelector('#mainContent')
      if (mainContent) {
        observer.observe(mainContent, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class']
        })
      } else {
        cleanup()
        reject(new Error('Main content not found'))
      }
    })
  }

  // Chain the promises
  waitForMainContent()
    .then(() => waitForLoadingToDisappear())
    .then(() => callback())
    .catch(error => {
      console.warn('LazyLoad failed:', error)
      // Fallback to immediate execution if something goes wrong
      callback()
    })
}

export const getTextWithoutRemarkLabel = (element: JQuery<any>) => {
  let text = ''
  element.contents().each(function () {
    if (this.nodeType === Node.TEXT_NODE) {
      text += $(this).text().trim()
    } else if (!$(this).hasClass('remark-label')) {
      text += getTextWithoutRemarkLabel($(this))
    }
  })
  return text
}
