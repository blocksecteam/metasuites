import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { chromeEvent } from '@common/event'
import {
  ETHERSCAN_PAGES,
  GET_TOKEN_MARKETPLACES,
  TokenType
} from '@common/constants'
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
    const { tokenType, markets } = res.data
    const containerEl = $(
      pageName === ETHERSCAN_PAGES.TOKEN.name
        ? tokenType === TokenType.ERC721
          ? '#ContentPlaceHolder1_tr_valuenft'
          : '#ContentPlaceHolder1_tr_valuepertoken'
        : '#ContentPlaceHolder1_tr_tokeninfo'
    )
    containerEl.css('position', 'relative')
    const rootEl = $('<div></div>')
    rootEl.css('position', 'absolute')
    rootEl.css({ right: '0', top: '50%', transform: 'translateY(-50%)' })
    containerEl.append(rootEl, containerEl)
    createRoot(rootEl[0]).render(
      <TokenMarketplacesBtn tokenType={tokenType} markets={markets} />
    )
  }
}

export default genTokenMarketplacesBtn
