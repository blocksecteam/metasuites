import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_IMPL_LABELS } from '@common/constants'
import { pickAddress } from '@common/utils'

import { MainAddressLabel } from '../components'

const genMainAddressLabel = async () => {
  const mainAddress = pickAddress(window.location.hash)

  if (!mainAddress) return

  await chromeEvent
    .emit(GET_IMPL_LABELS, { chain: 'tron', addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success && res.data.length) {
        const containerEl = $(
          '#mainContent .address-top .address-title .address-tag-box, #mainContent .contract-header .contract-name .tag-box'
        )
        const oLabels = containerEl
          .find('.address-label')
          .map(function () {
            return $(this).text().trim()
          })
          .get()
        if (!oLabels.includes(res.data[0].label)) {
          const labelRootEl = $('<div></div>')
          containerEl.prepend(labelRootEl)
          if (!labelRootEl.next().hasClass('address-divider')) {
            labelRootEl.css({ marginRight: 12 })
          }
          createRoot(labelRootEl[0]).render(
            <MainAddressLabel data={res.data[0]} />
          )
        }
      }
    })
}

export default genMainAddressLabel
