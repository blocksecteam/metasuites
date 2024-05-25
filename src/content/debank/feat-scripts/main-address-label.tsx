import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { ChainType } from '@common/constants'

import { MainPrivateLabel } from '../components'

const renderMainAddressLabel = async () => {
  $('#__metadock-main-address-label__').remove()
  const container = $('div[class^="HeaderInfo_userInfoContent"]')
  const mainAddressEl = container.find(
    'div[class^="HeaderInfo_address"] > span'
  )

  const mainAddress = mainAddressEl.text().trim()

  if (!mainAddress) return

  const rootEl = $(
    '<div id="__metadock-main-address-label__" style="margin-top: 8px"></div>'
  )
  container.append(rootEl)

  createRoot(rootEl[0]).render(
    <MainPrivateLabel address={mainAddress} chainType={ChainType.EVM} />
  )
}

export default renderMainAddressLabel
