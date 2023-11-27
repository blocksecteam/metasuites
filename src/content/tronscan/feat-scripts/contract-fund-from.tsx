import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import { GET_ADDRESS_FUNDER_RISK } from '@common/constants'
import type { AddressFunderRiskRes } from '@common/api/types'

import { FundFromTag } from '../components'

const displayContractFundFrom = async () => {
  const contractCreatorColEl = $(
    '#mainContent .contract-info-list .contract-creator-info-wrapper'
  ).next()

  const address = $('#mainContent .contract-creator-info-cont .address-link')
    .text()
    .trim()

  const res = await chromeEvent.emit<
    typeof GET_ADDRESS_FUNDER_RISK,
    AddressFunderRiskRes
  >(GET_ADDRESS_FUNDER_RISK, {
    address,
    chain: 'tron'
  })

  if (res?.success && res.data?.label) {
    const rootEl = $('<div class="mr-2"></div>')
    contractCreatorColEl.addClass(
      'd-flex align-items-center justify-content-end'
    )
    contractCreatorColEl.prepend(rootEl)
    createRoot(rootEl[0]).render(<FundFromTag data={res.data} />)
  }
}

export default displayContractFundFrom
