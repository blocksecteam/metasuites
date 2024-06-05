import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { pickTrxAddress } from '@common/utils'

import { FundFlowBtn } from '../components'

/** fund flow */
const genFundFlowBtn = async (container: JQuery<HTMLElement>) => {
  const mainAddress = pickTrxAddress(window.location.hash)

  if (!mainAddress) return

  const rootEl = $('<div></div>')
  container.append(rootEl)

  createRoot(rootEl[0]).render(<FundFlowBtn mainAddress={mainAddress} />)
}

export default genFundFlowBtn
