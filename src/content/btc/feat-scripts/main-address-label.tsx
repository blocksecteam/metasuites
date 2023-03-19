import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABELS, PATTERN_BTC_ADDRESS_EXAC } from '@common/constants'

import { MainAddressLabel } from '../components'

const genMainAddressLabel = async (chain: string) => {
  $('#__BTC_main_address_label__').remove()
  const mainAddress = window.location.href.slice(
    window.location.href.lastIndexOf('/') + 1
  )

  if (!PATTERN_BTC_ADDRESS_EXAC.test(mainAddress)) return

  await chromeEvent
    .emit(GET_ADDRESS_LABELS, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success && res.data.length) {
        const containerEl = $(
          '#__next > div:first-of-type > div:nth-of-type(2) > div:nth-of-type(2)'
        )
        const label = res.data[0].label
        if (label && containerEl) {
          const mainAddressLabelEl = document.querySelector<HTMLElement>(
            '#__BTC_main_address_label__'
          )
          if (mainAddressLabelEl?.innerText === label) return
          mainAddressLabelEl?.remove()
          const labelRootEl = $('<div />')
          labelRootEl.css('display', 'inline-block')
          labelRootEl.css('margin', '0 0 0 10px')
          labelRootEl.attr('id', '__BTC_main_address_label__')
          containerEl.append(labelRootEl)
          createRoot(labelRootEl[0]).render(<MainAddressLabel label={label} />)
        }
      }
    })
}

export default genMainAddressLabel
