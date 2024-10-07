import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import type { CSSProperties } from 'react'

import { pickSolanaAddress } from '@common/utils'
import { type SOLSCAN_PAGE_NAMES, SOLSCAN_PAGES } from '@common/constants'

import { FundFlowButton } from '../components'

const renderFundFlowButton = async (
  pageName: (typeof SOLSCAN_PAGE_NAMES)[number]
) => {
  $('#__metadock-modal-fund-flow__, #__metadock-fund-flow-btn__').remove()
  const isAccountPage = pageName === SOLSCAN_PAGES.ACCOUNT.name
  const selector = isAccountPage
    ? '#__next > div:nth-of-type(1) > div:nth-of-type(3) > div:first-child > div:first-child > div:last-child > div:first-child > div:first-child > div'
    : '#__next > div:nth-of-type(1) > div:nth-of-type(3) > div:first-child > div:first-child > div:last-child > div:first-child'
  const mainAddressEl = $(selector)
  const mainAddress = pickSolanaAddress(window.location.pathname)
  if (mainAddress) {
    const btnRootEl = $('<div id="__metadock-fund-flow-btn__"></div>')
    btnRootEl.css({
      display: isAccountPage ? 'inline-block' : 'block',
      verticalAlign: 'middle'
    })
    mainAddressEl.append(btnRootEl)
    const style: CSSProperties = {}
    if (isAccountPage) {
      style.marginLeft = 0
    } else {
      style.marginTop = 16
    }
    createRoot(btnRootEl[0]).render(
      <FundFlowButton chain="solana" mainAddress={mainAddress} style={style} />
    )
  }
}

export default renderFundFlowButton
