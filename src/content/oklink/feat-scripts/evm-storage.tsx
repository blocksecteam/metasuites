import { createRoot } from 'react-dom/client'

import { EvmStorageShortcut } from '@src/content/oklink/components'
import { EVM_STORAGE_SUPPORT_LIST } from '@common/constants'
import CHAIN from '../constant/chain'
import { createTimerFn } from '../utils'
import { getContractTabsDom } from '../utils/dom'

/** Show evm.storage shortcut */
const genEvmStorageShortcut = (address: string) => {
  if (!EVM_STORAGE_SUPPORT_LIST.includes(CHAIN.chain)) return
  createTimerFn(() => {
    const tabsEl = getContractTabsDom()
    if (!tabsEl) {
      return
    }
    const rootEl = document.createElement('div')
    tabsEl.append(rootEl)
    createRoot(rootEl).render(
      <EvmStorageShortcut chain={CHAIN.chain} address={address} />
    )
  })()
}

export default genEvmStorageShortcut
