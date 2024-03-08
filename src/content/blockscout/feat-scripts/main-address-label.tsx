import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_IMPL_LABELS } from '@common/constants'

import { MainAddressLabel } from '../components'
import { page } from '../utils'

/** enhanced address label */
const genMainAddressLabel = async (chain: string, addressHash: string) => {
  const addressTagEl = $('#meta-suites__address-tag')
  addressTagEl.css('display', 'none')

  const isDataLoaded = await page.waitUntilDataLoaded([
    '#meta-suites__address',
    '#meta-suites__address-tag'
  ])

  if (!isDataLoaded) return

  await chromeEvent
    .emit(GET_IMPL_LABELS, { chain: chain, addresses: [addressHash] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success && res.data.length) {
        const label = res.data[0].label
        if (label) {
          const addressTagEl = $('#meta-suites__address-tag')

          addressTagEl.css('display', 'block')

          createRoot(addressTagEl[0]).render(
            <MainAddressLabel data={res.data[0]} />
          )
        }
      }
    })
}

export default genMainAddressLabel
