import { store } from '@src/store'

import { genQuick2parsers } from '../feat-scripts'

const initTxPageScript = async (chain: string, txHash: string) => {
  const { quick2Parsers } = await store.get('options')

  if (quick2Parsers) genQuick2parsers(chain, txHash)
}

export default initTxPageScript
