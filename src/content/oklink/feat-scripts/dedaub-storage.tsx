import { createRoot } from 'react-dom/client'

import { DedaubStorageShortcut } from '@src/content/oklink/components'
import CHAIN from '../constant/chain'
import { createTimerFn } from '../utils'
import { getContractTabsDom } from '../utils/dom'

/** Show Dedaub Storage shortcut */
const genDedaubStorageShortcut = (address: string) => {
  createTimerFn(() => {
    const tabsEl = getContractTabsDom()
    if (!tabsEl) {
      return
    }
    const rootEl = document.createElement('div')
    tabsEl.append(rootEl)
    createRoot(rootEl).render(
      <DedaubStorageShortcut chain={CHAIN.chain} address={address} />
    )
  })()
}

export default genDedaubStorageShortcut
