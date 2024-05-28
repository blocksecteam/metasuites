import $ from 'jquery'

export const lazyLoad = (
  callback: () => void,
  inspector: string,
  maxRetries = 60
) => {
  const loadingDocument = !$('#__next > main').length
  if (loadingDocument) {
    if (maxRetries > 0) {
      setTimeout(() => {
        lazyLoad(callback, inspector, maxRetries - 1)
      }, 500)
    }
  } else {
    const loadingContent = !!$(inspector).length

    if (loadingContent) {
      if (maxRetries > 0) {
        setTimeout(() => {
          lazyLoad(callback, inspector, maxRetries - 1)
        }, 500)
      }
    } else {
      setTimeout(() => {
        callback()
      }, 1000)
    }
  }
}
