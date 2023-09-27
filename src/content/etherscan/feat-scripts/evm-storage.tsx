import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { pickAddress } from '@common/utils'
import { EvmStorageShortcut } from '@src/content/etherscan/components'
import { EVM_STORAGE_SUPPORT_LIST } from '@common/constants'

/** Show evm.storage shortcut */
const genEvmStorageShortcut = async (chain: string) => {
  if (!EVM_STORAGE_SUPPORT_LIST.includes(chain)) return
  const mainAddress = pickAddress(window.location.pathname)
  if (!mainAddress) return

  const isContract = !!document.querySelector(
    '#ContentPlaceHolder1_li_contracts'
  )
  if (!isContract) return

  const navTabsEl = $('#nav_subtabs')
  const rootEl = $('<div></div>')
  rootEl.css('display', 'contents')
  navTabsEl.append(rootEl)
  createRoot(rootEl[0]).render(
    <EvmStorageShortcut chain={chain} address={mainAddress} />
  )
}

export default genEvmStorageShortcut
