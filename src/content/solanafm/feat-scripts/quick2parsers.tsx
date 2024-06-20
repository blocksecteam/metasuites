import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { ParsersButton } from '../components'

const renderAlternativeParsers = async () => {
  const container = $(
    '#__next > main > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div > div'
  )
  const txHash = container.text().trim()
  const rootEl = $('<span class="inline-flex align-middle ml-1"></span>')
  container.append(rootEl)

  createRoot(rootEl[0]).render(<ParsersButton txHash={txHash} />)
}

export default renderAlternativeParsers
