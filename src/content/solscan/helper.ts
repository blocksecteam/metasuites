import $ from 'jquery'

export const lazyLoad = (callback: () => void, inspector: string) => {
  const loading = !$(inspector).length
  if (loading) {
    setTimeout(() => {
      lazyLoad(callback, inspector)
    }, 500)
  } else {
    requestIdleCallback(() => {
      callback()
    })
  }
}
