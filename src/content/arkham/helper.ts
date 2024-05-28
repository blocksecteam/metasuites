import $ from 'jquery'

export const lazyLoad = (
  callback: () => void,
  inspector: string,
  maxRetries = 60
) => {
  const loading = !$(inspector).length
  if (loading) {
    if (maxRetries > 0) {
      setTimeout(() => {
        lazyLoad(callback, inspector, maxRetries - 1)
      }, 500)
    } else {
      console.log('Maximum retries reached, giving up.')
    }
  } else {
    requestIdleCallback(callback)
  }
}
