import { URL_UPDATED } from '@src/common/constants'
import { getImageUrl } from '@src/common/utils'
import browser from 'webextension-polyfill'
import GLOBAL from '../constant/global'

export const getRealPathname = () => {
  const url = window.location.pathname
  const realPathname = url.replace(GLOBAL.prefixPath, '')
  return realPathname
}

export const getRealPathnameArray = () => {
  const realPathname = getRealPathname()
  return realPathname.split('/')
}

export const checkExplorer = (explorer: string) => {
  const realPathnameArray = getRealPathnameArray()
  const explorerPath = realPathnameArray[1]
  return explorerPath === explorer
}

export const getOKLinkImage = (name: string) => {
  return getImageUrl('oklink-' + name)
}

export const createTimerFn = (fn: () => void, time = 1000) => {
  let timer: string | number | NodeJS.Timeout | undefined
  return () => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      fn()
    }, time)
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message === URL_UPDATED) {
        clearInterval(timer)
        sendResponse()
      }
    })
  }
}
