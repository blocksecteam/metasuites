import $ from 'jquery'
import { createRoot } from 'react-dom/client'

import { store } from '@src/store'

import { PhalconExplorerButton } from './components'

export const initJito = async () => {
  const { quick2Parsers } = await store.get('options')
  if (!quick2Parsers) return
  const containers = $(
    '#__next > div > div > div > div:nth-of-type(3) > main > main > div:nth-of-type(2) > div > div:nth-of-type(8) > div:nth-of-type(2) > div > a'
  )
  containers.each(function () {
    const container = $(this)
    const txHash = container.find('div.break-all').text().trim()
    console.log('txHash', txHash)
    const rootEl = $(
      '<span class="inline-flex align-middle" style="margin-left: 8px"></span>'
    )
    container.find('> div > div:not(:hidden)').append(rootEl)
    createRoot(rootEl[0]).render(<PhalconExplorerButton txHash={txHash} />)
  })
}
