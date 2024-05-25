import $ from 'jquery'

export const lazyLoad = (callback: () => void) => {
  const loading =
    $(
      ".block main > div > div:first-child > section > div[class^='loading_loadingWrap']"
    ).length > 0
  if (loading) {
    setTimeout(() => {
      lazyLoad(callback)
    }, 500)
  } else {
    callback()
  }
}
