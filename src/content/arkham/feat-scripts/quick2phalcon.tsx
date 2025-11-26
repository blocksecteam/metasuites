import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { ARKHAM_PHALCON_SUPPORTED_LIST } from '@common/constants'

import { PhalconExplorerButton } from '../components'

const renderPhalconExplorerButton = () => {
  const txHashEl = $('a[class*="__externalLink"]')
  const name = $(
    'div[class*="__pageContainer"] div[class*="__txInfoBox"] > div[class*="__grid"] > div:nth-child(2)'
  )
    .text()
    .trim()
  const chain = ARKHAM_PHALCON_SUPPORTED_LIST.find(
    item => item.name === name
  )?.chain

  if (chain) {
    const rootEl = $('<span style="display: contents"></span>')
    txHashEl.append(rootEl)
    createRoot(rootEl[0]).render(<PhalconExplorerButton chain={chain} />)
  }
}

export default renderPhalconExplorerButton
