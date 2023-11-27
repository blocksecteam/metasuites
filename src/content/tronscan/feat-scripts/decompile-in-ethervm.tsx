import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import browser from 'webextension-polyfill'

import { pickAddress } from '@common/utils'
import { TRONSCAN_TABS_CHANGED } from '@common/constants'

import { DecompileInEthervmBtn } from '../components'
import { lazyLoad } from '../helper'

const genDecompileInEthervmBtn = () => {
  const main = async () => {
    if ($('#decompile-btn').length) return
    const mainAddress = pickAddress(window.location.hash)

    if (!mainAddress) return

    const container = $('.contract-container .contract-infos-title')
      .first()
      .find('div')

    container.addClass('align-items-center')

    const decompileBtnRootEl = $(
      '<div id="decompile-btn" class="tron-mr-12px"></div>'
    )
    container.prepend(decompileBtnRootEl)
    createRoot(decompileBtnRootEl[0]).render(
      <DecompileInEthervmBtn mainAddress={mainAddress} />
    )
  }

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === TRONSCAN_TABS_CHANGED) {
      lazyLoad(main, '#mainContent #tab_data_list #loadingVideo')
      sendResponse()
    }
  })
}

export default genDecompileInEthervmBtn
