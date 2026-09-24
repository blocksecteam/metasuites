import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { ChainFeature } from '@common/config/chain-feature'

import { PhalconExplorerButton } from '../components'
import { ARKHAM_SELECTORS, findFirst } from '../helper'

const NETWORK_LABEL = 'Network:'

/**
 * The transaction info box is a label/value grid. Anchor on the "Network:"
 * label rather than on the grid's class names, and fall back to the chain icon
 * next to it, whose `alt` carries the same name in lower case.
 */
const getNetworkName = (): string => {
  const scope = $('div[class*="__pageContainer"]')
  const root = scope.length ? scope : $(document.body)

  const labelEl = root
    .find('div, span')
    .filter(function () {
      return (
        $(this).children().length === 0 &&
        $(this).text().trim() === NETWORK_LABEL
      )
    })
    .first()

  if (!labelEl.length) return ''

  const value = labelEl.next().text().trim()
  if (value) return value

  return labelEl.parent().find('img[alt]').first().attr('alt') ?? ''
}

const renderPhalconExplorerButton = () => {
  const txHashEl = findFirst(ARKHAM_SELECTORS.txExternalLink)
  if (!txHashEl.length) return

  const chain = ChainFeature.chainByArkhamName(getNetworkName())
  if (!chain) return

  /**
   * The external link is a fixed-size icon button (h-5 w-5, p-0), so render
   * next to it instead of inside it, otherwise the icon is clipped.
   */
  const rootEl = $('<span class="inline-flex items-center"></span>')
  txHashEl.after(rootEl)
  createRoot(rootEl[0]).render(<PhalconExplorerButton chain={chain} />)
}

export default renderPhalconExplorerButton
