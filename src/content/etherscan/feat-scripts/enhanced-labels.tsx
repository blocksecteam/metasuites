import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import {
  validOrigin,
  isAddress,
  getSubStr,
  mergeAddressLabels,
  sanitizeText
} from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import {
  GET_ADDRESS_LABELS,
  TABLE_LIST_ADDRESS_SELECTORS_V2,
  TR_CONTRACT_ADDRESS_SELECTORS_V2,
  ChainType
} from '@common/constants'
import { widthScanV2Tooltip } from '@common/hoc'
import { TokenSymbol } from '@common/components'

const handleReplace = async (
  chain: string,
  elements: HTMLElement[],
  queryList: string[]
) => {
  if (!queryList.length) return
  const res = await chromeEvent.emit<typeof GET_ADDRESS_LABELS, AddressLabel[]>(
    GET_ADDRESS_LABELS,
    {
      chain: chain,
      addresses: queryList
    }
  )

  if (res?.success) {
    const resultLabels: AddressLabel[] = await mergeAddressLabels(
      ChainType.EVM,
      res.data
    )
    resultLabels.forEach(item => {
      elements.forEach(el => {
        const address = el.getAttribute('data-highlight-target') ?? ''
        if (
          (el.innerText.startsWith('0x') || item.isLocal) &&
          item.address.toLowerCase() === address.toLowerCase()
        ) {
          el.setAttribute(
            'data-bs-title',
            `${sanitizeText(item.label)}\n(${item.address})`
          )

          // Apply tooltip enhancement
          widthScanV2Tooltip(el)

          el.innerText = getSubStr(sanitizeText(item.label), [8, 6])
          const symbolRootEl = document.createElement('span')
          symbolRootEl.style.display = 'contents'
          el.prepend(symbolRootEl)
          createRoot(symbolRootEl).render(
            <TokenSymbol
              logo={item.logo}
              style={{ marginBottom: '2px', verticalAlign: 'middle' }}
            />
          )
        }
      })
    })
  }
}

/** enhanced address label */
const genEnhancedLabels = async (chain: string) => {
  const addressTags = $(
    `${TABLE_LIST_ADDRESS_SELECTORS_V2}, ${TR_CONTRACT_ADDRESS_SELECTORS_V2}`
  ).toArray()
  const iframes = document.querySelectorAll('iframe')

  function handleCollectReplaceTarget(nodeList: HTMLElement[]) {
    const tagsList: HTMLElement[] = []
    const addressList: string[] = []

    for (let i = 0; i < nodeList.length; ++i) {
      const el = nodeList[i]
      const address = el.getAttribute('data-highlight-target') ?? ''
      if (isAddress(address)) {
        if (!addressList.includes(address)) {
          addressList.push(address)
        }
        tagsList.push(el)
      }
    }
    return [tagsList, addressList] as const
  }

  /** iframe */
  for (let i = 0; i < iframes.length; ++i) {
    const iframe = iframes[i]
    if (validOrigin(iframe.src)) {
      iframe.addEventListener('load', function () {
        const _document = iframe?.contentWindow?.document
        if (_document) {
          const iframeAddressTags = $(_document)
            .find(TABLE_LIST_ADDRESS_SELECTORS_V2)
            .toArray()

          const [tagsList, addressList] =
            handleCollectReplaceTarget(iframeAddressTags)
          handleReplace(chain, tagsList, addressList)
        }
      })
    }
  }

  const [tagsList, addressList] = handleCollectReplaceTarget(addressTags)

  handleReplace(chain, tagsList, addressList)
}

export default genEnhancedLabels
