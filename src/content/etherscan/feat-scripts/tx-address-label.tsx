import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import { isAddress } from 'ethers'

import { pickAddress, setDeepestChildText } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABELS } from '@common/constants'

import { TokenSymbol } from '../components'

const isFromToAddress = (el: HTMLElement) => {
  return !!$(el).parent().siblings("a.js-clipboard[aria-label='Copy Address']")
    .length
}

const genTxPageAddressLabel = async (chain: string) => {
  const tagsList: HTMLElement[] = []
  const addressList: string[] = []

  $("*[href^='/address/']").each(function () {
    const el = $(this)

    // === Do not process elements that are already labeled ===
    const isFromTo = isFromToAddress(el[0])

    const regex = /\((.*?)\)/
    const match = $(this).parent().text().match(regex)
    const text = el.text()

    if (isFromTo && (match || !isAddress(text))) return
    // ======

    const address = pickAddress(el.attr('href')!)?.toLowerCase()
    if (address) {
      const tooltip = el.find("*[data-bs-toggle='tooltip']")
      if (tooltip.length) {
        el.css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })
      }

      if (!addressList.includes(address)) {
        addressList.push(address)
      }
      tagsList.push(el[0])
    }
  })

  if (!addressList.length) return

  const res = await chromeEvent.emit<typeof GET_ADDRESS_LABELS, AddressLabel[]>(
    GET_ADDRESS_LABELS,
    {
      chain: chain,
      addresses: addressList
    }
  )

  if (res?.success && res?.data?.length) {
    const resultLabels: AddressLabel[] = res.data
    resultLabels.forEach(item => {
      tagsList.forEach(el => {
        const address = pickAddress(
          el.getAttribute('href') ?? ''
        )?.toLowerCase()
        if (item.address === address) {
          if (isFromToAddress(el)) {
            $(el).text(item.address)
            const symbolRootEl = $('<span></span>')
            symbolRootEl.css('display', 'contents')
            const labelContainerEl = $('<span></span>')
            labelContainerEl.css({
              display: 'inline-flex',
              'align-items': 'center'
            })
            labelContainerEl
              .append(' (')
              .append(symbolRootEl)
              .append(`<span>${item.label}</span>)`)
            $(el).after(labelContainerEl)
            createRoot(symbolRootEl[0]).render(
              <TokenSymbol
                logo={item.logo}
                style={{ marginBottom: '2px', verticalAlign: 'middle' }}
              />
            )
          } else {
            setDeepestChildText(el, item.label)
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

export default genTxPageAddressLabel
