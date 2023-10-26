import { createRoot } from 'react-dom/client'
import isMobile from 'is-mobile'

import { ComplianceRadarPlot } from '@common/components'
import { chromeEvent } from '@common/event'
import { GET_NFT_RISK, EXT_SUPPORT_WEB_LIST } from '@common/constants'
import type { NFTRiskRes } from '@common/api/types'
import { pickAddress } from '@common/utils'

const genComplianceRadarPlot = async () => {
  const originGraphEl = document.querySelector<HTMLElement>(
    '#__metadock-ComplianceRadarPlot__'
  )
  if (originGraphEl) return

  const containerEl = document.querySelector<HTMLElement>(
    '#main > main > div > div > div > div:nth-of-type(5) > div > div:nth-of-type(2) > div, #main > div > div > div:nth-of-type(5) > div > div:nth-of-type(2) > div'
  )

  const linkEl = document.querySelector<HTMLElement>(
    '#main > main > div > div > div > div:nth-of-type(3) > div > div > div:last-of-type > div > div > div:first-of-type > div > div > a:first-of-type, #main > div > div > div:nth-of-type(3) > div > div > div:last-of-type > div > div > div:first-of-type > div > div > a:first-of-type'
  )

  if (!containerEl || !linkEl) return

  const href = linkEl.getAttribute('href')

  if (!href) return

  try {
    const host = new URL(href).host
    const chain = EXT_SUPPORT_WEB_LIST.find(item =>
      item.domains.some(i => host === i)
    )?.chain
    const address = pickAddress(href)

    if (!chain || !address) return

    const res = await chromeEvent.emit<typeof GET_NFT_RISK, NFTRiskRes>(
      GET_NFT_RISK,
      {
        address,
        chain
      }
    )

    if (res?.success && res.data) {
      document
        .querySelector<HTMLElement>('#__metadock-ComplianceRadarPlot__')
        ?.remove()
      containerEl.style.position = 'relative'
      const rootEl = document.createElement('div')
      rootEl.id = '__metadock-ComplianceRadarPlot__'
      if (!isMobile()) {
        rootEl.setAttribute(
          'style',
          'position:absolute;right:0;top:0;z-index:2147483647;'
        )
      }
      containerEl.appendChild(rootEl)
      createRoot(rootEl).render(<ComplianceRadarPlot data={res.data} />)
    }
  } catch (e) {
    console.log(e)
  }
}

export default genComplianceRadarPlot
