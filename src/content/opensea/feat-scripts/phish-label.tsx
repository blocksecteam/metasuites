import { createRoot } from 'react-dom/client'

import { pickAddress, isEvmAddress } from '@common/utils'
import { chromeEvent } from '@common/event'
import {
  GET_NFT_USER_LABELS,
  OPENSEA_PAGES,
  type OPENSEA_PAGE_NAMES
} from '@common/constants'
import type { NFTUserLabelsRes } from '@common/api/types'
import { PhishAddressLabel } from '@common/components'

const setLabels = async (
  addresses: string[],
  containerEl: HTMLElement | HTMLElement[]
) => {
  // append item
  if (!Array.isArray(containerEl)) {
    const address = addresses[0]
    const res = await chromeEvent.emit<
      typeof GET_NFT_USER_LABELS,
      NFTUserLabelsRes
    >(GET_NFT_USER_LABELS, {
      addresses: addresses as string[]
    })

    if (res?.success && res.data && res.data.labels?.[address]) {
      const rootEl = document.createElement('div')
      rootEl.style.marginLeft = '8px'
      containerEl.setAttribute('bsc-data', 'phish-marked')
      containerEl.appendChild(rootEl)
      createRoot(rootEl).render(
        <PhishAddressLabel label={res.data.labels[address]} />
      )
    }
  } else {
    // batch append
    const res = await chromeEvent.emit<
      typeof GET_NFT_USER_LABELS,
      NFTUserLabelsRes
    >(GET_NFT_USER_LABELS, {
      addresses: addresses as string[]
    })

    if (res?.success && res.data) {
      containerEl.forEach(el => {
        el.style.display = 'contents'
        const address = el.getAttribute('href')!.substr(1)
        const label = res.data.labels[address]
        if (res.data.labels[address]) {
          const rootEl = document.createElement('div')
          rootEl.style.marginLeft = '8px'
          el.setAttribute('bsc-data', 'phish-marked')
          el.appendChild(rootEl)
          createRoot(rootEl).render(<PhishAddressLabel label={label} />)
        }
      })
    }
  }
}

const batchProcessAddressList = (addressEls: HTMLElement[]) => {
  const elements: HTMLElement[] = []
  const addressList: string[] = []
  for (const addressEl of addressEls) {
    const address = addressEl.getAttribute('href')?.substr(1)
    if (address && isEvmAddress(address)) {
      elements.push(addressEl)
      addressList.push(address)
    }
  }
  if (addressList.length) {
    setLabels(addressList, elements)
  }
}

const genPhishAddressLabel = async (
  pageName: (typeof OPENSEA_PAGE_NAMES)[number]
) => {
  switch (pageName) {
    case OPENSEA_PAGES.COLLECTION.name:
      {
        const addressEls = document.querySelectorAll<HTMLElement>(
          "div[data-testid='ActivityTable'] a:not([bsc-data])"
        )
        if (addressEls.length) {
          batchProcessAddressList(Array.from(addressEls))
        }
      }
      break
    case OPENSEA_PAGES.ASSETS.name:
      {
        const addressEls = document.querySelectorAll<HTMLElement>(
          "div[data-testid='Panel'] a[class*='AccountLink']:not([bsc-data])"
        )
        if (addressEls.length) {
          batchProcessAddressList(Array.from(addressEls))
        }
      }
      break
    case OPENSEA_PAGES.USER.name:
      {
        /** index */
        const address = pickAddress(window.location.pathname)

        const nameContainerEl = document.querySelector<HTMLElement>(
          "div[data-testid='phoenix-header']:not([bsc-data])"
        )

        if (address && nameContainerEl) {
          setLabels([address], nameContainerEl)
        }

        /** activity */
        const addressEls = document.querySelectorAll<HTMLElement>(
          "div[data-testid='ActivityTable'] a:not([bsc-data])"
        )

        if (addressEls.length) {
          batchProcessAddressList(Array.from(addressEls))
        }
      }
      break
  }
}

export default genPhishAddressLabel
