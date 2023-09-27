import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { pickAddress } from '@common/utils'
import { ProxyLogReference } from '@src/content/etherscan/components'
import { PROXY_LOG_SUPPORT_LIST } from '@common/constants'

/** Show proxy log */
const genProxyContractLog = async (chain: string) => {
  if (!PROXY_LOG_SUPPORT_LIST.includes(chain)) return
  const mainAddress = pickAddress(window.location.pathname)
  if (!mainAddress) return

  // if it is open source and has a proxy contract
  const contractCodeEl = $(
    '#ContentPlaceHolder1_contractCodeDiv, #ContentPlaceHolder1_li_readProxyContract, #ContentPlaceHolder1_li_writeProxyContract'
  )
  if (contractCodeEl.length < 3) return

  const navTabsEl = $('#nav_subtabs')
  const rootEl = $('<div></div>')
  rootEl.css('display', 'contents')
  navTabsEl.append(rootEl)
  createRoot(rootEl[0]).render(
    <ProxyLogReference chain={chain} address={mainAddress} />
  )
}

export default genProxyContractLog
