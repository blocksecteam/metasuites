import $ from 'jquery'

export const lazyLoad = (
  callback: () => void,
  inspector: string,
  maxRetries = 60
) => {
  const loadingDocument = !$('#root > div[class^="DesktopFrame_container"]')
    .length
  if (loadingDocument) {
    if (maxRetries > 0) {
      setTimeout(() => {
        lazyLoad(callback, inspector, maxRetries - 1)
      }, 500)
    }
  } else {
    const loadingContent = !$(inspector).length
    if (loadingContent) {
      if (maxRetries > 0) {
        setTimeout(() => {
          lazyLoad(callback, inspector, maxRetries - 1)
        }, 500)
      }
    } else {
      requestIdleCallback(() => {
        callback()
      })
    }
  }
}
