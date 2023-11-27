import $ from 'jquery'

import {
  EXT_SUPPORT_WEB_LIST,
  ETHERSCAN_PAGES,
  TRONSCAN_PAGES,
  OPENSEA_PAGES,
  PHALCON_SUPPORT_LIST
} from '@common/constants'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { ChainUtils } from '@common/utils/chain'

export const getChainSimpleName = (): string | undefined => {
  return ChainUtils.getCurrentChain()
}

export const getPageName = (
  pathname: string = window.location.pathname
): string => {
  const PAGES: Record<string, object> = {
    OPENSEA_PAGES,
    ETHERSCAN_PAGES,
    TRONSCAN_PAGES
  }
  const siteName = EXT_SUPPORT_WEB_LIST.flatMap(item => [
    item,
    ...(item.testNets || [])
  ]).find(site =>
    site.domains.some(item => window.location.host === item)
  )?.siteName
  return Object.values(PAGES[`${siteName}_PAGES`]).find(item =>
    item.pattern.test(pathname)
  )?.name
}

export const getEtherscanNameTag = (): string => {
  return $('#ContentPlaceHolder1_moreoptionsdiv')
    .prev()
    .find('> *')
    .has("i[class*='fa-tag']")
    .text()
    .trim()
}

export const getEtherscanTags = (): string[] => {
  const tags: string[] = []
  $('#ContentPlaceHolder1_divLabels > a').each(function () {
    tags.push($(this).text().trim())
  })
  return tags
}

export const getEtherscanEnsName = (): string => {
  return $('#ensName').text().trim()
}

export const getAnyScanNameTag = (): string => {
  return $(
    "#ContentPlaceHolder1_divSummary h2.card-header-title:contains('Overview')"
  )
    .siblings()
    .text()
    .trim()
}

export const getPhalconSimulationURL = (
  chain: string,
  hash: string,
  isPrerun: boolean
) => {
  const path = PHALCON_SUPPORT_LIST.find(item => item.chain === chain)?.pathname
  if (!path) return ''
  return `${PHALCON_EXPLORER_DOMAIN}/tx/${path}/${hash}?event=${
    isPrerun ? 'prerun' : 'simulation'
  }&type=2`
}
