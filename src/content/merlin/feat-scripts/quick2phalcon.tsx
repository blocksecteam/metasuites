import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { PhalconExplorerButton } from '../components'

const renderPhalconExplorerButton = () => {
  const txHashEl = $(
    '.block main > div > div:first-child > section > div:nth-of-type(3) > div:nth-of-type(2) > div > div:last-child > div:nth-of-type(2) > div:first-child > div:first-child'
  )
  if (txHashEl) {
    const rootEl = $('<div></div>')
    txHashEl.append(rootEl)
    createRoot(rootEl[0]).render(<PhalconExplorerButton />)
  }
}

export default renderPhalconExplorerButton
