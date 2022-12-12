import { createRoot } from 'react-dom/client'

import { isAddress, validOrigin } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import {
  GET_ADDRESS_LABEL,
  TABLE_LIST_ADDRESS_SELECTORS
} from '@common/constants'
import { CopyButton } from '@common/components'

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
        const innerText = el.innerText
        if (item.address === innerText) {
          el.innerHTML = `<a target="_parent" href="/address/${item.address}">${item.label}</a>`
          el.parentNode?.childNodes.forEach(item => {
            if (item.nodeName === 'I') {
              item.remove()
            }
          })
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

const genEnhancedLabels = async (chain: string) => {
  const addressTags = document.querySelectorAll<HTMLElement>(
    TABLE_LIST_ADDRESS_SELECTORS
  )
  const iframes = document.querySelectorAll('iframe')

  function handleCollectReplaceTarget(nodeList: NodeListOf<HTMLElement>) {
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

  /** iframe */
  for (let i = 0; i < iframes.length; ++i) {
    const iframe = iframes[i]
    if (validOrigin(iframe.src)) {
      iframe.addEventListener('load', function () {
        const _document = iframe?.contentWindow?.document
        if (_document) {
          const iframeAddressTags = _document.querySelectorAll<HTMLElement>(
            "a.hash-tag[href^='/address/'], span.hash-tag[title*='0x' i]"
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
