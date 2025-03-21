import { store } from '@src/store'
import {
  genQuick2parsersBtn,
  genTransactionExplanationBtn
} from '../feat-scripts'

const initTxPageScript = () => {
  requestIdleCallback(async () => {
    const { quick2Parsers, txSummary } = await store.get('options')
    if (quick2Parsers) genQuick2parsersBtn()
    if (txSummary) genTransactionExplanationBtn()
  })
}

export default initTxPageScript
