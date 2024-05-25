import $ from 'jquery'

export const lazyLoad = (callback: () => void, inspector: string) => {
  const loadingDocument = !$('#__next > main').length
  if (loadingDocument) {
    setTimeout(() => {
      lazyLoad(callback, inspector)
    }, 500)
  } else {
    const loadingContent = !!$(inspector).length

    if (loadingContent) {
      setTimeout(() => {
        lazyLoad(callback, inspector)
      }, 500)
    } else {
      setTimeout(() => {
        callback()
      }, 1000)
    }
  }
}
