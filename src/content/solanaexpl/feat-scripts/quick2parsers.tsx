import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { ParsersButton } from '../components'

const renderAlternativeParsers = async () => {
  const container = $(
    '.card table .list tr:first-of-type > td:last-child > div'
  ).first()
  const txHash = container.text().trim()
  const rootEl = $('<span class="font-size-tiny me-2"></span>')
  container.prepend(rootEl)

  createRoot(rootEl[0]).render(<ParsersButton txHash={txHash} />)
}

export default renderAlternativeParsers
