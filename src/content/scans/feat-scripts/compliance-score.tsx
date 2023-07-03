import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import type { RiskScore } from '@common/api/types'
import { GET_ADDRESS_RISK_SCORE } from '@common/constants'
import { getAnyScanNameTag } from '@common/utils'

import { ComplianceScoreLabel } from '../components'

const getScanLabels = (): string[] => {
  const labels: string[] = []
  const addressLabelEls = $(
    "#content > .container > div:first-child > div:first-child > div > a[href*='/accounts/label'], #content > .container > div:first-child > div:first-child > div > span"
  )
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

  const txHashEl = document.querySelector<HTMLElement>(
    '#content > div.container'
  )

  const rootEl = document.createElement('div')
  rootEl.style.display = 'inline-block'
  txHashEl?.appendChild(rootEl)

  const res = await chromeEvent.emit<typeof GET_ADDRESS_RISK_SCORE, RiskScore>(
    GET_ADDRESS_RISK_SCORE,
    {
      chain: chain,
      address: mainAddress,
      addressLabel: {
        labels: getScanLabels(),
        nameTag: getAnyScanNameTag()
      }
    }
  )
  if (res?.success && res.data) {
    const data = res.data
    createRoot(rootEl).render(<ComplianceScoreLabel risk={data.risk} />)
  }
}

export default genComplianceScoresBtn
