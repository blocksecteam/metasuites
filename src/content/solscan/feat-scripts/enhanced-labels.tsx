import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { getSubStr, mergeAddressLabels } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import {
  GET_ADDRESS_LABELS,
  ChainType,
  PATTERN_SOLANA_ADDRESS_LOOSE
} from '@common/constants'
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
        const address = el.getAttribute('address')
        if (item.address === address) {
          el.innerHTML = `<span title="${item.label}">${getSubStr(
            item.label,
            [8, 6]
          )}</span>`
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

const renderEnhancedLabels = async () => {
  const addressTags = $('table a.text-link[href^="/account/" i]').toArray()
  function handleCollectReplaceTarget(nodeList: HTMLElement[]) {
    const tagsList: HTMLElement[] = []
    const addressList: string[] = []

    for (let i = 0; i < nodeList.length; ++i) {
      const el = nodeList[i]
      const href = el.getAttribute('href')
      const match = href?.match(PATTERN_SOLANA_ADDRESS_LOOSE)
      if (match) {
        if (!addressList.includes(match[0])) {
          addressList.push(match[0])
        }
        el.setAttribute('address', match[0])
        tagsList.push(el)
      }
    }
    return [tagsList, addressList] as const
  }

  const [tagsList, addressList] = handleCollectReplaceTarget(addressTags)

  handleReplace(tagsList, addressList)
}

export default renderEnhancedLabels
