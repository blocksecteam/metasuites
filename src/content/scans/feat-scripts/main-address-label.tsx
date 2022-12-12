import type { CallbackResponse } from 'chrome-extension-core/lib/event'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_ADDRESS_LABEL } from '@common/constants'
import { createRoot } from 'react-dom/client'

import { MainAddressLabel } from '../components'

const genMainAddressLabel = async (chain: string) => {
  const mainAddressEl = document.querySelector<HTMLElement>('#mainaddress')

  const mainAddress = mainAddressEl?.innerText

  if (!mainAddress) return

  await chromeEvent
    .emit(GET_ADDRESS_LABEL, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success && res.data.length) {
        const containerEl = document.querySelector(
          '#content > .container > div:first-child > div:first-child > div'
        )
        const label = res.data[0].label
        if (label && containerEl) {
          const labelRootEl = document.createElement('div')
          labelRootEl.style.display = 'inline-block'
          containerEl?.appendChild(labelRootEl)
          createRoot(labelRootEl).render(<MainAddressLabel label={label} />)
        }
      }
    })
}

export default genMainAddressLabel
