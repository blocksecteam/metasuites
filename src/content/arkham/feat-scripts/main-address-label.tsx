import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { ChainType } from '@common/constants'
import { pickAddress } from '@common/utils'

import { MainPrivateLabel } from '../components'
import { ARKHAM_SELECTORS, findFirst } from '../helper'

const renderMainAddressLabel = async () => {
  const mainAddress = pickAddress(window.location.pathname)

  if (!mainAddress) return

  const anchorEl = findFirst(ARKHAM_SELECTORS.addressTitle)
  if (!anchorEl.length) return

  /** The anchor sits inside the row holding the name, so render as its sibling */
  const containerEl = anchorEl.closest('span').first()
  const targetEl = containerEl.length ? containerEl : anchorEl.parent()

  const labelRootEl = $('<div class="flex items-center flex-wrap gap-2"></div>')
  targetEl.append(labelRootEl)

  createRoot(labelRootEl[0]).render(
    <MainPrivateLabel chainType={ChainType.EVM} address={mainAddress} />
  )
}

export default renderMainAddressLabel
