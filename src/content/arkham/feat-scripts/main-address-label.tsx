import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { ChainType } from '@common/constants'

import { MainPrivateLabel } from '../components'

const renderMainAddressLabel = async () => {
  const container = $('div[class^="Header_displayNameAddress"]:first')

  const mainAddress = container.find('input').val()

  if (!mainAddress) return

  const labelRootEl = $('<div class="flex items-center flex-wrap gap-2"></div>')
  container.append(labelRootEl)

  createRoot(labelRootEl[0]).render(
    <MainPrivateLabel chainType={ChainType.EVM} address={mainAddress} />
  )
}

export default renderMainAddressLabel
