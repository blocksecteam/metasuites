import { store } from '@src/store'
import { genQuick2parsersBtn, genTransactionExplanationBtn, genTxFortaAlertTip } from '../feat-scripts'
import CHAIN from '../constant/chain'

const initTxPageScript = () => {
  requestIdleCallback(async () => {
    const { quick2Parsers, txSummary, txnFortaAlert } = await store.get('options')
    if (quick2Parsers) genQuick2parsersBtn()
    if (txSummary) genTransactionExplanationBtn()
    if (txnFortaAlert) {
      if (CHAIN.isARBITRUM || CHAIN.isBSC || CHAIN.isETH) {
        genTxFortaAlertTip()
      }
    }
  })
}

export default initTxPageScript
