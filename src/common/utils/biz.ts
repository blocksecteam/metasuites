import {
  EXT_SUPPORT_WEB_LIST,
  SCAN_PAGES,
  OPENSEA_PAGES
} from '@common/constants'

export const getChainSimpleName = (): string | undefined => {
  const host = window.location.host
  return EXT_SUPPORT_WEB_LIST.find(item => item.domains.some(i => host === i))
    ?.chain
}

export const getPageName = (
  pathname: string = window.location.pathname
): string => {
  const PAGES: Record<string, object> = {
    OPENSEA_PAGES,
    SCAN_PAGES
  }
  const siteName = EXT_SUPPORT_WEB_LIST.find(site =>
    site.domains.some(item => window.location.host === item)
  )?.siteName
  return Object.values(PAGES[`${siteName}_PAGES`]).find(item =>
    pathname.startsWith(item.pathname)
  )?.name
}
