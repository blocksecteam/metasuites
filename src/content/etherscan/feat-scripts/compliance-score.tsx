import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import type { RiskScore } from '@common/api/types'
import { GET_ADDRESS_RISK_SCORE } from '@common/constants'

import { ComplianceScoreLabel } from '../components'

const getScanLabels = (): string[] => {
  const labels: string[] = []

  const contractLabelEls = document.querySelectorAll<HTMLElement>(
    '#ContentPlaceHolder1_divSummary > div:first-child > div:first-child > a, #ContentPlaceHolder1_divSummary > div:first-child > div:first-child .badge'
  )
  for (let i = 0; i < contractLabelEls.length; i++) {
    labels.push(contractLabelEls[i].innerText)
  }

  return labels
}

/** address compliance score*/
const genComplianceScoresBtn = async (chain: string) => {
  const mainAddressEl = document.querySelector<HTMLElement>('#mainaddress')

  const mainAddress = mainAddressEl?.innerText

  if (!mainAddress) return

  const mainAddressSectionEl = document.querySelector<HTMLElement>(
    '#content > section.container-xxl'
  )

  const rootEl = document.createElement('div')
  rootEl.style.display = 'inline-block'
  rootEl.classList.add('mt-2')
  mainAddressSectionEl?.appendChild(rootEl)

  const res = await chromeEvent.emit<typeof GET_ADDRESS_RISK_SCORE, RiskScore>(
    GET_ADDRESS_RISK_SCORE,
    {
      chain: chain,
      address: mainAddress,
      addressLabel: {
        labels: getScanLabels()
      }
    }
  )
  if (res?.success && res.data) {
    const data = res.data
    createRoot(rootEl).render(<ComplianceScoreLabel risk={data.risk} />)
  }
}

export default genComplianceScoresBtn
