import { createRoot } from 'react-dom/client'

import {
  validOrigin,
  getSubStr,
  mergeAddressLabels,
  pickAddress
} from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import {
  GET_ADDRESS_LABELS,
  TABLE_LIST_ADDRESS_SELECTORS,
  TR_CONTRACT_ADDRESS_SELECTORS,
  ChainType
} from '@common/constants'
import { CopyButton, TokenSymbol } from '@common/components'

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
        const title =
          el.getAttribute('data-original-title') || el.getAttribute('title')
        const address = pickAddress(title ?? '')
        if (
          (el.innerText.startsWith('0x') || item.isLocal) &&
          item.address.toLowerCase() === address?.toLowerCase()
        ) {
          el.innerHTML = `<a target="_parent" href="/address/${
            item.address
          }">${getSubStr(item.label, [8, 6])}</a>`
          el.parentNode?.childNodes.forEach(item => {
            if (item.nodeName === 'I') {
              item.remove()
            }
          })
          el.setAttribute(
            'data-original-title',
            `${item.label}\n(${item.address})`
          )
          const symbolRootEl = document.createElement('span')
          const copyRootEl = document.createElement('span')
          symbolRootEl.style.display = 'contents'
          copyRootEl.classList.add('__metadock-copy-address-btn__')
          copyRootEl.setAttribute(
            'style',
            'position:absolute;right:0;display:none'
          )
          el.prepend(symbolRootEl)
          el.appendChild(copyRootEl)
          createRoot(symbolRootEl).render(<TokenSymbol logo={item.logo} />)
          createRoot(copyRootEl).render(<CopyButton text={item.address} />)
        }
      })
    })
  }
}

/** enhanced address label */
const genEnhancedLabels = async (chain: string) => {
  const addressTags = document.querySelectorAll<HTMLElement>(
    `${TABLE_LIST_ADDRESS_SELECTORS}, ${TR_CONTRACT_ADDRESS_SELECTORS}`
  )
  const iframes = document.querySelectorAll('iframe')

  function handleCollectReplaceTarget(nodeList: NodeListOf<HTMLElement>) {
    const tagsList: HTMLElement[] = []
    const addressList: string[] = []

    for (let i = 0; i < nodeList.length; ++i) {
      const el = nodeList[i]
      const title =
        el.getAttribute('data-original-title') || el.getAttribute('title')
      if (!title) continue
      const address = pickAddress(title)
      if (address) {
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
          const iframeAddressTags = _document.querySelectorAll<HTMLElement>(
            'a.hash-tag, span.hash-tag'
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
