import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_IMPL_LABELS } from '@common/constants'

import { MainAddressLabel } from '../components'

/** enhanced address label */
const genMainAddressLabel = async (chain: string) => {
  const mainAddress = $('#meta-suites__address').data('hash')

  if (!mainAddress) return

  await chromeEvent
    .emit(GET_IMPL_LABELS, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success && res.data.length) {
        const label = res.data[0].label
        if (label) {
          const containerEl = $('#meta-suites__address-tag')
          containerEl.css('display', 'block')
          createRoot(containerEl[0]).render(
            <MainAddressLabel data={res.data[0]} />
          )
        }
      }
    })
}

export default genMainAddressLabel
