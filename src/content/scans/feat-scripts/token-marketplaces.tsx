import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import { ETHERSCAN_PAGES, GET_TOKEN_MARKETPLACES } from '@common/constants'
import { pickAddress } from '@common/utils'
import type { TokenMarketplacesRes } from '@common/api/types'

import { TokenMarketplacesBtn } from '../components'

const genTokenMarketplacesBtn = async (chain: string, pageName: string) => {
  const mainAddress = pickAddress(window.location.pathname)
  if (!mainAddress) return

  const res = await chromeEvent.emit<
    typeof GET_TOKEN_MARKETPLACES,
    TokenMarketplacesRes
  >(GET_TOKEN_MARKETPLACES, {
    chain,
    address: mainAddress
  })

  if (res?.success && res.data) {
    const { markets } = res.data
    const containerEl = $(
      pageName === ETHERSCAN_PAGES.ADDRESS.name
        ? '#ContentPlaceHolder1_tr_tokeninfo > div > div:last-child'
        : '#ContentPlaceHolder1_tr_valuepertoken > div > div:first-child > span'
    )
    containerEl.css('position', 'relative')
    const rootEl = $('<span></span>')
    containerEl.append(rootEl, containerEl)
    createRoot(rootEl[0]).render(<TokenMarketplacesBtn markets={markets} />)
  }
}

export default genTokenMarketplacesBtn
