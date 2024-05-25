import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import $ from 'jquery'
import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_IMPL_LABELS } from '@common/constants'

import { MainAddressLabel } from '../components'

/** enhanced address label */
const genMainAddressLabel = async (chain: string) => {
  const mainAddressEl = document.querySelector<HTMLElement>('#mainaddress')

  const mainAddress = mainAddressEl?.innerText

  if (!mainAddress) return

  await chromeEvent
    .emit(GET_IMPL_LABELS, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success) {
        const containerEl = $(
          '#content > .container:first-of-type > div:first-child > div:first-child > div'
        )
        const labelRootEl = $('<span></span>')
        labelRootEl.css({
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4
        })
        labelRootEl.addClass('mt-1')
        containerEl.append(labelRootEl)
        createRoot(labelRootEl[0]).render(
          <MainAddressLabel
            label={res.data[0]}
            address={mainAddress}
            chain={chain}
          />
        )
      }
    })
}

export default genMainAddressLabel
