import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_IMPL_LABELS } from '@common/constants'

import { MainAddressLabel } from '../components'

/** enhanced address label */
const genMainAddressLabel = async (chain: string) => {
  const mainAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
  // const mainAddress = $('#mainaddress').text().trim()
  // TODO @tom2drum get address from page

  if (!mainAddress) return

  await chromeEvent
    .emit(GET_IMPL_LABELS, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      console.log('__>__', res)
      if (res?.success && res.data.length) {
        const containerEl = $(
          'main > div:first-child > div:first-child > div:last-child'
        )
        const label = res.data[0].label
        if (
          label
          // TODO @tom2drum check if there is no similar tags
          // &&
          // label !== getEtherscanNameTag() &&
          // label !== getEtherscanEnsName() &&
          // !getEtherscanTags().includes(label)
        ) {
          const labelRootEl = $('<span></span>')
          containerEl.append(labelRootEl)
          createRoot(labelRootEl[0]).render(
            <MainAddressLabel data={res.data[0]} />
          )
        }
      }
    })
}

export default genMainAddressLabel
