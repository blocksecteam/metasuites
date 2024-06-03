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

  await chromeEvent
    .emit(GET_IMPL_LABELS, { chain: chain, addresses: [mainAddress] })
    .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
      const divSummaryEl = $('#ContentPlaceHolder1_divSummary')
      const containerEl = divSummaryEl.find(
        '> div:first-child > div:first-child'
      )
      divSummaryEl.find('> div').removeAttr('style')
      if (!divSummaryEl.hasClass('pt-2')) {
        divSummaryEl.addClass('pt-2')
      }
      if (res?.success && res.data.length) {
        const label = res.data[0].label
        if (
          label &&
          label !== getEtherscanNameTag() &&
          label !== getEtherscanEnsName() &&
          !getEtherscanTags().includes(label)
        ) {
          const labelRootEl = $('<span></span>')
          containerEl.append(labelRootEl)
          createRoot(labelRootEl[0]).render(
            <MainAddressLabel data={res.data[0]} />
          )
        }
      }
      const localLabelEl = $('<span></span>')
      containerEl.append(localLabelEl)
      createRoot(localLabelEl[0]).render(
        <MainPrivateLabel
          chainType={classifyByChain(chain)}
          address={mainAddress}
        />
      )
    })
}

export default genMainAddressLabel
