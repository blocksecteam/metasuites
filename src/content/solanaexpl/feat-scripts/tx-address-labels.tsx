import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { mergeAddressLabels, isAddress } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABELS, ChainType } from '@common/constants'
import { TokenSymbol } from '@common/components'

const handleReplace = async (elements: HTMLElement[], queryList: string[]) => {
  if (!queryList.length) return
  const res = await chromeEvent.emit<typeof GET_ADDRESS_LABELS, AddressLabel[]>(
    GET_ADDRESS_LABELS,
    {
      chain: 'solana',
      addresses: queryList
    }
  )

  if (res?.success) {
    const resultLabels: AddressLabel[] = await mergeAddressLabels(
      ChainType.SOLANA,
      res.data
    )
    resultLabels.forEach(item => {
      elements.forEach(el => {
        const innerText = el.innerText
        if (item.address === innerText) {
          el.innerHTML = `<span title="${item.label}">${item.label}</span>`
          const symbolRootEl = $('<span style="display: contents"></span>')
          el.prepend(symbolRootEl[0])
          createRoot(symbolRootEl[0]).render(
            <TokenSymbol
              style={{ display: 'inline' }}
              size={16}
              logo={item.logo}
            />
          )
        }
      })
    })
  }
}

const renderTxPageAddressLabels = async () => {
  const addressTags = $(
    'table > tbody > tr > td:nth-of-type(2) a[href^="/address/"]'
  ).toArray()
  function handleCollectReplaceTarget(nodeList: HTMLElement[]) {
    const tagsList: HTMLElement[] = []
    const addressList: string[] = []

    for (let i = 0; i < nodeList.length; ++i) {
      const el = nodeList[i]
      const innerText = el.innerText
      if (isAddress(innerText)) {
        if (!addressList.includes(innerText)) {
          addressList.push(innerText)
        }
        tagsList.push(el)
      }
    }
    return [tagsList, addressList] as const
  }

  const [tagsList, addressList] = handleCollectReplaceTarget(addressTags)

  handleReplace(tagsList, addressList)
}

export default renderTxPageAddressLabels
