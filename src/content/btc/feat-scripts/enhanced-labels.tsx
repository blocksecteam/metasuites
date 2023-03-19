import $ from 'jquery'

import { pickAddress } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABELS } from '@common/constants'

const handleReplace = async (
  chain: string,
  elements: HTMLElement[],
  queryList: string[]
) => {
  const res = await chromeEvent.emit<typeof GET_ADDRESS_LABELS, AddressLabel[]>(
    GET_ADDRESS_LABELS,
    {
      chain: chain,
      addresses: queryList
    }
  )

  if (res?.success && res?.data?.length) {
    const resultLabels: AddressLabel[] = res.data
    for (let i = 0; i < elements.length; ++i) {
      const el = elements[i]
      const innerText = el.innerText
      const match = resultLabels.find((item: AddressLabel) => {
        if (innerText.indexOf('...') !== -1) {
          return (
            item.address.indexOf(innerText.split('...')[0]) !== -1 &&
            item.address.indexOf(innerText.split('...')[1]) !== -1
          )
        }
        return item.address === innerText
      })
      if (match) el.childNodes[0].textContent = match.label
    }
  }
}

const genEnhancedLabels = async (chain: string) => {
  const addressTags = $(
    "a[href*='/btc/address' i], a[href*='/btc/address' i] > div"
  ).toArray()

  const addressList: string[] = []
  const tagsList: HTMLElement[] = []

  for (let i = 0; i < addressTags.length; ++i) {
    const el = addressTags[i]
    const href = el.getAttribute('href')
    if (href && href.toLowerCase().indexOf('/btc/address/') !== -1) {
      tagsList.push(el)
      const address = pickAddress(href)
      if (address && !addressList.includes(address)) addressList.push(address)
    }
  }

  if (addressList.length) handleReplace(chain, tagsList, addressList)
}

export default genEnhancedLabels
