import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { PhalconExplorerButton } from '../components'

const renderAlternativeParsers = async () => {
  if ($('#__metadock-alternative-parsers__').length) return
  const container = $(
    '#__next > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1)'
  )
  const txHash = container.find('div:first').text().trim()
  const rootEl = $(
    '<span id="__metadock-alternative-parsers__" style="margin-left: 12px"></span>'
  )
  container.append(rootEl)

  createRoot(rootEl[0]).render(<PhalconExplorerButton txHash={txHash} />)
}

export default renderAlternativeParsers
