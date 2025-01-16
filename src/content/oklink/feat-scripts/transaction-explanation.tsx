import { isHexString } from 'ethers'
import { createRoot } from 'react-dom/client'

import {
  TransactionExplanation,
  ExplainBtn
} from '@src/content/oklink/components'
import { TX_EXPLAIN_SUPPORT_LIST } from '@common/constants'
import CHAIN from '../constant/chain'
import { getTxOverviewDom, getTxTabsDom } from '../utils/dom'
import { createTimerFn } from '../utils'
import txPage from '../constant/txPage'
import GLOBAL from '../constant/global'

const startUI = () => {
  const txHash = txPage.hash
  const clearTimer = createTimerFn(() => {
    const txOverview = getTxOverviewDom()
    const txHash = txPage.hash
    if (!txOverview || !txHash) return
    if (!isHexString(txHash, 32)) return
    const rootEl = document.createElement('div')
    txOverview.prepend(rootEl)
    createRoot(rootEl).render(
      <TransactionExplanation
        tx={txHash}
        chain={CHAIN.chain}
        clearTimer={clearTimer}
      />
    )
  })({
    clearFn: () => {
      return !(txHash === txPage.hash && GLOBAL.isTx)
    }
  })
}

const genTransactionExplanationBtn = () => {
  createTimerFn(() => {
    if (!TX_EXPLAIN_SUPPORT_LIST.includes(CHAIN.chain)) return
    const container = getTxTabsDom()
    if (!container) return
    const rootEl = document.createElement('div')
    container.appendChild(rootEl)
    createRoot(rootEl).render(
      <ExplainBtn
        onClick={() => {
          startUI()
        }}
      />
    )
  })()
}

export default genTransactionExplanationBtn
