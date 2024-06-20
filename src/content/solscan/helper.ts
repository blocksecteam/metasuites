import $ from 'jquery'

export const lazyLoad = (
  callback: () => void,
  inspector: string,
  isNegative = true,
  maxRetries = 60
) => {
  const loading = isNegative ? !$(inspector).length : !!$(inspector).length
  if (loading) {
    if (maxRetries > 0) {
      setTimeout(() => {
        lazyLoad(callback, inspector, isNegative, maxRetries - 1)
      }, 500)
    }
  } else {
    requestIdleCallback(() => {
      callback()
    })
  }
}
