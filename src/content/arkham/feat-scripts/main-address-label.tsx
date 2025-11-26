import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { ChainType } from '@common/constants'
import { pickAddress } from '@common/utils'

import { MainPrivateLabel } from '../components'

const renderMainAddressLabel = async () => {
  const container = $('div[class*="__displayNameAddress"]:first')

  const mainAddress = pickAddress(window.location.pathname)

  if (!mainAddress) return

  const labelRootEl = $('<div class="flex items-center flex-wrap gap-2"></div>')
  container.append(labelRootEl)

  createRoot(labelRootEl[0]).render(
    <MainPrivateLabel chainType={ChainType.EVM} address={mainAddress} />
  )
}

export default renderMainAddressLabel
