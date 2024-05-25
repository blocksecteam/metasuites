import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABELS } from '@common/constants'

import { MainAddressLabel } from '../components'

const renderMainAddressLabel = async () => {
  const container = $('#md-account-box')
  const mainAddress = container.attr('data-address')

  if (!mainAddress) return

  const labelRootEl = $('<div style="display: contents"></div>')
  container.prepend(labelRootEl)

  await chromeEvent
    .emit(GET_ADDRESS_LABELS, {
      chain: 'solana',
      addresses: [mainAddress]
    })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success) {
        const el = $('<div style="display: contents"></div>')
        labelRootEl.append(el)
        createRoot(el[0]).render(
          <MainAddressLabel address={mainAddress} label={res.data[0]} />
        )
      }
    })
}

export default renderMainAddressLabel
