import $ from 'jquery'
import { ethers } from 'ethers'

import {
  EXT_SUPPORT_WEB_LIST,
  PHALCON_SUPPORT_LIST,
  ETHERSCAN_PAGES,
  BLOCKSCOUT_PAGES,
  TRONSCAN_PAGES,
  OPENSEA_PAGES,
  MERLINSCAN_PAGES,
  SOLSCAN_PAGES,
  SOLANAFM_PAGES,
  SOLANAEXPL_PAGES,
  ARKHAM_PAGES,
  PATTERN_EVM_ADDRESS_EXAC,
  type ChainType
} from '@common/constants'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { ChainUtils, classifyByChain } from '@common/utils/chain'
import type { AddressLabel } from '@common/api/types'
import { store } from '@src/store'
import { uniqBy } from 'lodash-es'

export const getChainSimpleName = (): string | undefined => {
  return ChainUtils.getCurrentChain()
}

export const getPageName = (
  pathname: string = window.location.pathname
): string => {
  const PAGES: Record<string, object> = {
    OPENSEA_PAGES,
    ETHERSCAN_PAGES,
    TRONSCAN_PAGES,
    BLOCKSCOUT_PAGES,
    MERLINSCAN_PAGES,
    SOLSCAN_PAGES,
    SOLANAFM_PAGES,
    SOLANAEXPL_PAGES,
    ARKHAM_PAGES
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

export const mergeAddressLabels = async (
  chainType: ChainType,
  addressLabels: AddressLabel[]
) => {
  const privateLabels = await store.get('privateLabels')
  const { enablePrivateLabels } = await store.get('options')
  if (!enablePrivateLabels) return addressLabels
  const remoteAddressLabels = addressLabels.map(item => {
    const proxyPrivateLabel =
      privateLabels[
        `${classifyByChain(item.chain)}-${formatAddress(item.address)}`
      ]
    if (proxyPrivateLabel) {
      item.label = proxyPrivateLabel.label
    }
    if (item.implementAddress) {
      const implementPrivateLabel =
        privateLabels[
          `${classifyByChain(item.chain)}-${formatAddress(
            item.implementAddress
          )}`
        ]
      if (implementPrivateLabel) {
        item.implementLabel = implementPrivateLabel.label
      }
    }
    return item
  })
  const localAddressLabels = Object.keys(privateLabels)
    .filter(k => k.includes(chainType))
    .map(key => {
      const chain = key.split('-')[0]
      const address = key.split('-')[1]
      return {
        chain,
        address,
        label: privateLabels[key].label,
        isLocal: true
      } as AddressLabel
    })
  return uniqBy([...localAddressLabels, ...remoteAddressLabels], 'address')
}

/**
 * When the address is evm address, it will be converted to checksum address, so that it can be used as a key
 * @param address
 */
export const formatAddress = (address: string) => {
  return PATTERN_EVM_ADDRESS_EXAC.test(address)
    ? ethers.getAddress(address)
    : address
}

export const isHashItemsSimilar = (
  hash1: string,
  hash2: string,
  numItems: number
) => {
  const arr1 = hash1.split('/')
  const arr2 = hash2.split('/')
  const slicedArr1 = arr1.slice(0, numItems)
  const slicedArr2 = arr2.slice(0, numItems)

  for (let i = 0; i < numItems; i++) {
    if (slicedArr1[i] !== slicedArr2[i]) {
      return false
    }
  }
  return true
}
