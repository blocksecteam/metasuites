import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import '@common/styles/inject.common'
import { store } from '@src/store'
import { PATTERN_SOLANA_TX_HASH } from '@common/constants'

import { PhalconExplorerButton } from './components'

const execute = async () => {
  const { quick2Parsers } = await store.get('options')
  if (!quick2Parsers) return

  const maxRetries = 100
  const retryInterval = 500

  let retryCount = 0
  const findContainers = () => {
    const containers = $(
      '#__next > div > div > div > div:nth-of-type(3) > main > main > div:nth-of-type(2) > div > div:nth-of-type(8) > div:nth-of-type(2) > div a'
    )
    return containers.length > 0 ? containers : null
  }

  const callback = () => {
    const containers = findContainers()
    if (containers) {
      containers.each((index, element) => {
        const container = $(element)
        if (container.find('#phalcon-explorer-button').length > 0) return
        const txHash = container.attr('href')?.split('/').pop()
        if (txHash && PATTERN_SOLANA_TX_HASH.test(txHash)) {
          const rootEl = $(
            `<span id="phalcon-explorer-button" class="inline-flex align-middle" style="margin-left: 8px"></span>`
          )
          container.find('> div > div:not(:hidden)').append(rootEl)
          createRoot(rootEl[0]).render(
            <PhalconExplorerButton txHash={txHash} />
          )
        }
      })
    } else {
      retryCount++
      if (retryCount < maxRetries) {
        setTimeout(findContainersAndRender, retryInterval)
      } else {
        console.log('Maximum retries reached, giving up.')
      }
    }
  }

  const findContainersAndRender = () => {
    const containers = findContainers()
    if (containers) {
      callback()
    } else {
      retryCount++
      if (retryCount < maxRetries) {
        setTimeout(findContainersAndRender, retryInterval)
      }
    }
  }

  findContainersAndRender()
}

export default execute
