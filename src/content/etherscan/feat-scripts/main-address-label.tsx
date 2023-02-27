import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABELS } from '@common/constants'

import { MainAddressLabel } from '../components'

/** enhanced address label */
const genMainAddressLabel = async (chain: string) => {
  const mainAddressEl = document.querySelector<HTMLElement>('#mainaddress')

  const mainAddress = mainAddressEl?.innerText

  if (!mainAddress) return

  await chromeEvent
    .emit(GET_ADDRESS_LABELS, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success && res.data.length) {
        const containerEl = document.querySelector(
          '#ContentPlaceHolder1_divSummary > div:first-child > div:first-child'
        )
        const label = res.data[0].label
        if (label && containerEl) {
          document
            .querySelector('#ContentPlaceHolder1_divSummary > div')
            ?.removeAttribute('style')
          const labelRootEl = document.createElement('div')
          labelRootEl.style.display = 'inline-block'
          containerEl?.appendChild(labelRootEl)
          createRoot(labelRootEl).render(<MainAddressLabel label={label} />)
        }
      }
    })
}

export default genMainAddressLabel
