import { store } from '@src/store'

import { genTransactionExplanationBtn, genQuick2parsers } from '../feat-scripts'

const initTxPageScript = async (chain: string) => {
  const { txSummary, quick2Parsers } = await store.get('options')

  if (txSummary) genTransactionExplanationBtn(chain)
  if (quick2Parsers) genQuick2parsers(chain)
}

export default initTxPageScript
