import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import { GET_ADDRESS_FUNDER_RISK } from '@common/constants'
import type { AddressFunderRiskRes } from '@common/api/types'
import { pickAddress } from '@common/utils'

import { FundFromTag } from '../components'

/** Show the source of funding for contract deployers */
const displayContractFundFrom = async (chain: string) => {
  const contractCreatorColEl = document.querySelector<HTMLElement>(
    '#ContentPlaceHolder1_trContract > .row > div:last-of-type'
  )

  const contractAddressEl = document?.querySelector<HTMLElement>(
    '#ContentPlaceHolder1_trContract > .row > div:last-of-type > a'
  )

  const href = contractAddressEl?.getAttribute('href')

  if (!href) return

  const address = pickAddress(href)

  if (!address || !contractCreatorColEl) return

  const res = await chromeEvent.emit<
    typeof GET_ADDRESS_FUNDER_RISK,
    AddressFunderRiskRes
  >(GET_ADDRESS_FUNDER_RISK, {
    address,
    chain
  })

  if (res?.success && res.data?.label) {
    const rootEl = document.createElement('div')
    contractCreatorColEl.appendChild(rootEl)
    createRoot(rootEl).render(<FundFromTag data={res.data} />)
  }
}

export default displayContractFundFrom
