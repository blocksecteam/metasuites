import { store } from '@src/store'

import { genTransactionExplanationBtn } from '../feat-scripts'

const initTxPageScript = async (chain: string) => {
  const { txSummary } = await store.get('options')

  if (txSummary) genTransactionExplanationBtn(chain)
}

export default initTxPageScript
