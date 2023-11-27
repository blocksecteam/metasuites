import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { RiskScore } from '@common/api/types'
import { GET_ADDRESS_RISK_SCORE } from '@common/constants'
import { pickAddress } from '@common/utils'

import { ComplianceScoreLabel } from '../components'

/** address compliance score*/
const genComplianceScoresBtn = async (container: JQuery<HTMLElement>) => {
  const mainAddress = pickAddress(window.location.hash)

  if (!mainAddress) return

  const rootEl = $('<div></div>')

  const res = await chromeEvent.emit<typeof GET_ADDRESS_RISK_SCORE, RiskScore>(
    GET_ADDRESS_RISK_SCORE,
    {
      chain: 'tron',
      address: mainAddress
    }
  )
  if (res?.success && res.data) {
    container.prepend(rootEl)
    const data = res.data
    createRoot(rootEl[0]).render(<ComplianceScoreLabel risk={data.risk} />)
  }
}

export default genComplianceScoresBtn
