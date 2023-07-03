import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { RiskScore } from '@common/api/types'
import { GET_ADDRESS_RISK_SCORE } from '@common/constants'
import { getEtherscanNameTag } from '@common/utils'

import { ComplianceScoreLabel } from '../components'

const getScanLabels = (): string[] => {
  const labels: string[] = []
  const addressLabelEls = $('#ContentPlaceHolder1_divLabels > .badge')
  addressLabelEls.each(function () {
    labels.push($(this).text().trim())
  })
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
        labels: getScanLabels(),
        nameTag: getEtherscanNameTag()
      }
    }
  )
  if (res?.success && res.data) {
    const data = res.data
    createRoot(rootEl).render(<ComplianceScoreLabel risk={data.risk} />)
  }
}

export default genComplianceScoresBtn
