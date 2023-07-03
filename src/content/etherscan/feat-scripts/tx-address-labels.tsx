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

const isFromToAddress = (el: HTMLElement) => {
  return !!$(el).parent().siblings("a.js-clipboard[aria-label='Copy Address']")
    .length
}

const getAddressTag = (
  el: JQuery<HTMLElement>,
  addressList: string[] = []
): [HTMLElement | null, string] => {
  let tag: HTMLElement | null = null
  let address = ''

  if (el.text().startsWith('0x')) {
    const href = el.attr('href')!.toLowerCase()
    const _address =
      getHrefQueryVariable(href, 'a') ?? pickAddress(href)?.toLowerCase()
    if (_address) {
      const tooltip = el.find("*[data-bs-toggle='tooltip']")
      if (tooltip.length) {
        el.css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })
      }

      if (!addressList.includes(_address)) {
        address = _address
      }
      tag = el[0]
    }
  }

  return [tag, address]
}

const genImplAddressLabels = async (chain: string) => {
  const tagList: HTMLElement[] = []
  const addressList: string[] = []

  $("*[href^='/address/'], *[href^='/token/']").each(function () {
    const el = $(this)

    // === Do not process addresses that have already been flagged or addresses that are not from/to addresses. ===
    const isFromTo = isFromToAddress(el[0])
    if (!isFromTo) return
    const text = el.text()

    if (!isAddress(text)) return
    // ======

    const [tag, address] = getAddressTag(el, addressList)
    if (tag) tagList.push(tag)
    if (address) addressList.push(address)
  })

  if (!addressList.length) return

  const res = await chromeEvent.emit<typeof GET_IMPL_LABELS, AddressLabel[]>(
    GET_IMPL_LABELS,
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
          const regex = /\((.*?)\)/
          const matchEthersTag = $(el).parent().text().match(regex)
          // Replace the tags added by Etherscan
          if (matchEthersTag) {
            // case: to address
            $(el)
              .next()
              .filter(function () {
                return regex.test($(this).text())
              })
              .remove()
            // case: from address
            const textNode = $(el)[0].nextSibling
            if (textNode) $(textNode).remove()
          }
          const {
            label,
            implementLabel,
            implementAddress,
            implementLogo,
            address,
            logo
          } = item
          $(el).text(address)
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
              <TokenSymbol
                logo={implementLogo}
                style={{ marginBottom: '2px', verticalAlign: 'middle' }}
              />
            )
          }
          labelContainerEl.append(')')
          $(el).after(labelContainerEl)
          createRoot(proxySymbolRootEl[0]).render(
            <TokenSymbol
              logo={logo}
              style={{ marginBottom: '2px', verticalAlign: 'middle' }}
            />
          )
        }
      })
    })
  }
}

const genNormalAddressLabels = async (chain: string) => {
  const tagList: HTMLElement[] = []
  const addressList: string[] = []

  $("*[href^='/address/'], *[href^='/token/']").each(function () {
    const el = $(this)

    if (isFromToAddress(el[0])) return

    const [tag, address] = getAddressTag(el, addressList)
    if (tag) tagList.push(tag)
    if (address) addressList.push(address)
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
      })
    })
  }
}

const genTxPageAddressLabels = (chain: string) => {
  // from/to address(The implementation contract needs to be marked)
  genImplAddressLabels(chain)
  // others address
  genNormalAddressLabels(chain)
}

export default genTxPageAddressLabels
