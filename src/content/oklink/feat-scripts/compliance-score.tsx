import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import type { RiskScore } from '@common/api/types'
import { GET_ADDRESS_RISK_SCORE } from '@common/constants'

import { ComplianceScoreLabel } from '../components'
import AddressPage from '../constant/addressPage'
import CHAIN from '../constant/chain'
import { getAddressToolsDom } from '../utils/dom'
import { createTimerFn } from '../utils'

/** address compliance score*/
const genComplianceScoresBtn = () => {
  createTimerFn(async () => {
    const mainAddress = AddressPage.address
    if (!mainAddress) return

    const mainAddressSectionEl = getAddressToolsDom()

    if (!mainAddressSectionEl) return

    const rootEl = document.createElement('div')
    mainAddressSectionEl?.appendChild(rootEl)

    const res = await chromeEvent.emit<
      typeof GET_ADDRESS_RISK_SCORE,
      RiskScore
    >(GET_ADDRESS_RISK_SCORE, {
      chain: CHAIN.chain,
      address: mainAddress
    })

    if (res?.success && res.data) {
      const data = res.data
      createRoot(rootEl).render(<ComplianceScoreLabel risk={data.risk} />)
    }
  })()
}

export default genComplianceScoresBtn
