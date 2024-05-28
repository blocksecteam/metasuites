import $ from 'jquery'

export const lazyLoad = (callback: () => void, maxRetries = 60) => {
  const loading =
    $(
      ".block main > div > div:first-child > section > div[class^='loading_loadingWrap']"
    ).length > 0
  if (loading) {
    if (maxRetries > 0) {
      setTimeout(() => {
        lazyLoad(callback, maxRetries - 1)
      }, 500)
    }
  } else {
    callback()
  }
}
