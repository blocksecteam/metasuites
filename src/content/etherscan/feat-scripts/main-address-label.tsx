import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_IMPL_LABELS } from '@common/constants'
import {
  getEtherscanNameTag,
  getEtherscanTags,
  getEtherscanEnsName,
  classifyByChain
} from '@common/utils'

import { MainAddressLabel, MainPrivateLabel } from '../components'

/** enhanced address label */
const genMainAddressLabel = async (chain: string) => {
  const mainAddress = $('#mainaddress').text().trim()

  if (!mainAddress) return

  const divSummaryEl = $('#ContentPlaceHolder1_divSummary')
  const containerEl = $('#ContentPlaceHolder1_divLabels')
  console.log('containerEl', containerEl[0])
  divSummaryEl.find('> div').removeAttr('style')
  if (!divSummaryEl.hasClass('pt-2')) {
    divSummaryEl.addClass('pt-2')
  }

  // Create placeholder for MainAddressLabel that will be populated later
  const labelRootEl = $('<span></span>')
  containerEl.append(labelRootEl)

  // Immediately render MainPrivateLabel without waiting for API response
  const localLabelEl = $('<span></span>')
  containerEl.append(localLabelEl)
  createRoot(localLabelEl[0]).render(
    <MainPrivateLabel
      chainType={classifyByChain(chain)}
      address={mainAddress}
    />
  )

  // Fetch address labels asynchronously
  await chromeEvent
    .emit(GET_IMPL_LABELS, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      if (res?.success && res.data.length) {
        const label = res.data[0].label
        if (
          label &&
          label !== getEtherscanNameTag() &&
          label !== getEtherscanEnsName() &&
          !getEtherscanTags().includes(label)
        ) {
          // Render MainAddressLabel if valid data is returned
          createRoot(labelRootEl[0]).render(
            <MainAddressLabel data={res.data[0]} />
          )
        } else {
          // Remove placeholder if we don't need to render the label
          labelRootEl.remove()
        }
      } else {
        // Remove placeholder if API request failed or returned no data
        labelRootEl.remove()
      }
    })
}

export default genMainAddressLabel
