import { createRoot } from 'react-dom/client'

import { validOrigin, pickAddress } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import {
  GET_ADDRESS_LABEL,
  TABLE_LIST_ADDRESS_SELECTORS_V2
} from '@common/constants'

import { TokenSymbol } from '../components'

const handleReplace = async (
  chain: string,
  elements: HTMLElement[],
  queryList: string[]
) => {
  if (!queryList.length) return
  const res = await chromeEvent.emit<typeof GET_ADDRESS_LABEL, AddressLabel[]>(
    GET_ADDRESS_LABEL,
    {
      chain: chain,
      addresses: queryList
    }
  )

  if (res?.success && res?.data?.length) {
    const resultLabels: AddressLabel[] = res.data
    resultLabels.forEach(item => {
      elements.forEach(el => {
        const href = el.getAttribute('href')
        if (href) {
          const address = pickAddress(href)
          if (item.address === address) {
            el.innerHTML = `<a target="_parent" href="/address/${item.address}">${item.label}</a>`
            el.parentNode?.childNodes.forEach(item => {
              if (item.nodeName === 'I') {
                item.remove()
              }
            })
            // el.setAttribute(
            //   'data-original-title',
            //   `${item.label}\n(${item.address})`
            // )
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
        }
      })
    })
  }
}

/** enhanced address label */
const genEnhancedLabels = async (chain: string) => {
  const addressTags = document.querySelectorAll<HTMLElement>(
    TABLE_LIST_ADDRESS_SELECTORS_V2
  )
  const iframes = document.querySelectorAll('iframe')

  function handleCollectReplaceTarget(nodeList: NodeListOf<HTMLElement>) {
    const tagsList: HTMLElement[] = []
    const addressList: string[] = []

    for (let i = 0; i < nodeList.length; ++i) {
      const el = nodeList[i]
      const innerText = el.innerText
      if (innerText.startsWith('0x')) {
        const href = el.getAttribute('href')
        if (href) {
          const address = pickAddress(href)
          if (address) {
            if (!addressList.includes(address)) {
              addressList.push(address)
            }
            tagsList.push(el)
          }
        }
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
          const iframeAddressTags = _document.querySelectorAll<HTMLElement>(
            "a[href^='/address/']"
          )
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
