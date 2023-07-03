import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import { isAddress } from 'ethers'

import {
  pickAddress,
  setDeepestChildText,
  getHrefQueryVariable
} from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABELS, GET_IMPL_LABELS } from '@common/constants'
import { TokenSymbol } from '@common/components'

const genImplAddressLabel = async (chain: string) => {
  const addressList: string[] = []

  const toAddress = $('#contractCopy')
  const regex = /\((.*?)\)/
  const match = toAddress
    .parent()
    .children()
    .not('#wrapperContent')
    .text()
    .match(regex)
  const text = toAddress.text()
  if (isAddress(text)) {
    if (!addressList.includes(text)) {
      addressList.push(text)
    }
  }

  if (!addressList.length) return

  const res = await chromeEvent.emit<typeof GET_IMPL_LABELS, AddressLabel[]>(
    GET_IMPL_LABELS,
    {
      chain: chain,
      addresses: addressList
    }
  )

  if (res?.success && res?.data?.length) {
    // Replace the tags added by Etherscan
    if (match) {
      $('#spanToAdd')
        .next()
        .filter(function () {
          return regex.test($(this).text())
        })
        .remove()
    }
    const {
      label,
      implementLabel,
      implementAddress,
      implementLogo,
      address,
      logo
    } = res.data[0]
    toAddress.text(address)
    const proxySymbolRootEl = $('<span></span>')
    const implSymbolRootEl = $('<span></span>')
    proxySymbolRootEl.css('display', 'contents')
    implSymbolRootEl.css('display', 'contents')
    const labelContainerEl = $('<span></span>')
    labelContainerEl.css({
      display: 'inline-flex',
      'align-items': 'center'
    })
    labelContainerEl
      .append('(')
      .append(proxySymbolRootEl)
      .append(`<span>${label}</span>`)
    if (implementLabel) {
      labelContainerEl
        .append(`<span style="padding: 0 4px;">(-></span>`)
        .append(implSymbolRootEl)
        .append(
          `<a href="/address/${implementAddress}" target="_blank">${implementLabel}</a>`
        )
        .append(')')
      createRoot(implSymbolRootEl[0]).render(
        <TokenSymbol logo={implementLogo} style={{ verticalAlign: 'middle' }} />
      )
    }
    labelContainerEl.append(')')
    toAddress.after(labelContainerEl)
    createRoot(proxySymbolRootEl[0]).render(
      <TokenSymbol logo={logo} style={{ verticalAlign: 'middle' }} />
    )
  }
}

const genNormalAddressLabels = async (chain: string) => {
  const tagList: HTMLElement[] = []
  const addressList: string[] = []

  $("*[href^='/address/'], *[href^='/token/']")
    .not('#addressCopy,#contractCopy')
    .each(function () {
      const el = $(this)
      // === Do not process elements that are already labeled ===
      if (!el.text().startsWith('0x')) return
      // ======
      const href = el.attr('href')!.toLowerCase()
      const address =
        getHrefQueryVariable(href, 'a') ?? pickAddress(href)?.toLowerCase()
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
        tagList.push(el[0])
      }
    })

  // from address
  $('#addressCopy').each(function () {
    const regex = /\((.*?)\)/
    const text = $(this).text()
    const match = $(this).parent().text().trim().match(regex)
    if (!match && isAddress(text)) {
      tagList.push($(this)[0])
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
      tagList.forEach(el => {
        const href = el.getAttribute('href')?.toLowerCase() ?? ''
        const address = getHrefQueryVariable(href, 'a') ?? pickAddress(href)

        if (item.address === address) {
          const id = el.getAttribute('id')
          if (id === 'addressCopy') {
            // from address
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

const genTxPageAddressLabels = async (chain: string) => {
  // to address(The implementation contract needs to be marked)
  genImplAddressLabel(chain)
  // others address
  genNormalAddressLabels(chain)
}

export default genTxPageAddressLabels
