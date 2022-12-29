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
    const valuenftEl = document.querySelector<HTMLElement>(
      '#ContentPlaceHolder1_tr_valuenft > .row'
    )
    const rootEl = document.createElement('div')
    if (valuenftEl) {
      valuenftEl.setAttribute('class', 'row align-items-center')
      valuenftEl.children[0].setAttribute('class', 'col-md-4')
      rootEl.classList.add('col-md-8')
      valuenftEl.appendChild(rootEl)
    } else {
      const overviewCardBodyEl = document.querySelector<HTMLElement>(
        '#ContentPlaceHolder1_divSummary > div.row > div:first-of-type > .card > .card-body'
      )
      const hrEl = document.createElement('hr')
      hrEl.classList.add('hr-space')
      overviewCardBodyEl?.prepend(hrEl)
      hrEl.parentNode?.insertBefore(rootEl, hrEl)
    }
    createRoot(rootEl).render(<TokenPriceInfo data={res.data} />)
  }
}

export default displayTokenPrice
