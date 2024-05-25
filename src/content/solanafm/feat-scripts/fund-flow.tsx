import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { FundFlowButton } from '../components'

const renderFundFlowButton = async () => {
  $('#__metadock-modal-fund-flow__, #__metadock-fund-flow-btn__').remove()
  const container = $('#md-account-box')
  const mainAddress = container.attr('data-address')
  if (mainAddress) {
    const btnRootEl = $('<div></div>')
    container.append(btnRootEl)
    createRoot(btnRootEl[0]).render(
      <FundFlowButton chain="solana" mainAddress={mainAddress} />
    )
  }
}

export default renderFundFlowButton
