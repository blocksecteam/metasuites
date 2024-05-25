import $ from 'jquery'

export const lazyLoad = (callback: () => void, inspector: string) => {
  const loadingDocument = !$('#root > div[class^="DesktopFrame_container"]')
    .length
  if (loadingDocument) {
    setTimeout(() => {
      lazyLoad(callback, inspector)
    }, 500)
  } else {
    const loadingContent = !$(inspector).length
    if (loadingContent) {
      setTimeout(() => {
        lazyLoad(callback, inspector)
      }, 500)
    } else {
      requestIdleCallback(() => {
        callback()
      })
    }
  }
}
