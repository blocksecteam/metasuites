import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { pickAddress } from '@common/utils'

import { FundFlowBtn } from '../components'

const genFundFlowBtn = async (
  chain: string,
  container: JQuery<HTMLElement>
) => {
  const mainAddress = pickAddress(window.location.href)

  if (!mainAddress) return

  const rootEl = $('<div></div>')
  container.append(rootEl)

  createRoot(rootEl[0]).render(
    <FundFlowBtn chain={chain} mainAddress={mainAddress} />
  )
}

export default genFundFlowBtn
