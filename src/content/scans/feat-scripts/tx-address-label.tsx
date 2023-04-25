import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import { isAddress } from 'ethers'

import { pickAddress, setDeepestChildText } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABELS } from '@common/constants'

import { TokenSymbol } from '../components'

const genTxPageAddressLabel = async (chain: string) => {
  const tagsList: HTMLElement[] = []
  const addressList: string[] = []

  $("*[href^='/address/']")
    .not('#addressCopy,#contractCopy')
    .each(function () {
      const el = $(this)
      // === Do not process elements that are already labeled ===
      if (!el.text().startsWith('0x')) return
      // ======
      const address = pickAddress(el.attr('href')!)
      if (address) {
        const tooltip = el.find("*[data-bs-toggle='tooltip']")
        if (tooltip.length) {
          el.addClass('center')
        }

        if (!addressList.includes(address)) {
          addressList.push(address)
        }
        tagsList.push(el[0])
      }
    })

  $('#addressCopy,#contractCopy').each(function () {
    const regex = /\((.*?)\)/
    const match = $(this).parent().text().match(regex)
    const text = $(this).text()
    if (!match && isAddress(text)) {
      tagsList.push($(this)[0])
      if (!addressList.includes(text)) {
        addressList.push(text)
      }
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
        const address = pickAddress(el.getAttribute('href') ?? '')

        if (item.address === address) {
          const id = el.getAttribute('id')
          if (id && ['addressCopy', 'contractCopy'].includes(id)) {
            // from or to
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
            // others addresses
            setDeepestChildText(el, item.label)
            const symbolRootEl = $('<span></span>')
            symbolRootEl.css('display', 'contents')
            if ($(el).find('span.hash-tag').length) {
              $(el).find('span.hash-tag').prepend(symbolRootEl)
            } else {
              $(el).prepend(symbolRootEl)
            }
            createRoot(symbolRootEl[0]).render(
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
