import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { PhalconExplorerButton } from '../components'

const renderAlternativeParsers = async () => {
  const container = $(
    '.card table .list tr:first-of-type > td:last-child > div'
  ).first()
  const txHash = container.text().trim()
  const rootEl = $(
    '<span class="font-size-tiny" style="margin-right: 8px"></span>'
  )
  container.prepend(rootEl)

  createRoot(rootEl[0]).render(<PhalconExplorerButton txHash={txHash} />)
}

export default renderAlternativeParsers
