import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import { GET_NFT_PRICE } from '@common/constants'
import type { NFTPriceResponse } from '@common/api/types'
import { pickAddress } from '@common/utils'

import { TokenPriceInfo } from '../components'

const displayTokenPrice = async () => {
  const mainAddress = pickAddress(window.location.pathname)

  if (!mainAddress) return

  const res = await chromeEvent.emit<typeof GET_NFT_PRICE, NFTPriceResponse>(
    GET_NFT_PRICE,
    mainAddress
  )

  if (res?.success && res.data) {
    const rootEl = document.createElement('div')
    const marketEl = document.querySelector<HTMLElement>(
      '#ContentPlaceHolder1_divSummary > div.row > div:nth-of-type(2) > .card > .card-body'
    )
    if (marketEl) {
      marketEl.insertBefore(rootEl, marketEl.children[0].nextSibling)
      createRoot(rootEl).render(<TokenPriceInfo data={res.data} />)
    }
  }
}

export default displayTokenPrice
