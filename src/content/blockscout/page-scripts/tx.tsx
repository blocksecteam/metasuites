import { store } from '@src/store'

import { genTransactionExplanationBtn, genQuick2parsers } from '../feat-scripts'

const initTxPageScript = async (chain: string, txHash: string) => {
  const { txSummary, quick2Parsers } = await store.get('options')

  if (txSummary) genTransactionExplanationBtn(chain, txHash)
  if (quick2Parsers) genQuick2parsers(chain, txHash)
}

export default initTxPageScript
