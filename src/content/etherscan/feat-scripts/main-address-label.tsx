import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_IMPL_LABELS } from '@common/constants'
import {
  getEtherscanNameTag,
  getEtherscanTags,
  getEtherscanEnsName
} from '@common/utils'

import { MainAddressLabel } from '../components'

/** enhanced address label */
const genMainAddressLabel = async (chain: string) => {
  const mainAddress = $('#mainaddress').text().trim()

  if (!mainAddress) return

  await chromeEvent
    .emit(GET_IMPL_LABELS, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success && res.data.length) {
        const containerEl = $(
          '#ContentPlaceHolder1_divSummary > div:first-child > div:first-child'
        )
        const label = res.data[0].label
        if (
          label &&
          label !== getEtherscanNameTag() &&
          label !== getEtherscanEnsName() &&
          !getEtherscanTags().includes(label)
        ) {
          $('#ContentPlaceHolder1_divSummary > div').removeAttr('style')
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
