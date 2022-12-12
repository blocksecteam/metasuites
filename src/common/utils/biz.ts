import {
  SUPPORT_WEB_LIST,
  SCAN_PAGES,
  type SCAN_PAGE_NAMES
} from '@common/constants'

export const getChainSimpleName = (): string | undefined => {
  const host = window.location.host
  return SUPPORT_WEB_LIST.find(item => item.domains.some(i => host === i))
    ?.chain
}

export const getScanAddressHref = (chain: string, address: string) => {
  const hrefPrefix = SUPPORT_WEB_LIST.find(
    item => item.chain === chain
  )?.scanHrefPrefix
  return hrefPrefix ? `${hrefPrefix}/${address}` : '/'
}

export const getScanPageName = (
  pathname: string = window.location.pathname
): typeof SCAN_PAGE_NAMES[number] | undefined => {
  return Object.values(SCAN_PAGES).find(item =>
    pathname.startsWith(item.pathname)
  )?.name
}
