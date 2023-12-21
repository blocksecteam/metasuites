import { store } from '@src/store'

import { genQuick2ParsersBtn } from '../feat-scripts'

const initTxPageScript = async (chain: string) => {
  const { quick2Parsers } = await store.get('options')

  if (quick2Parsers) genQuick2ParsersBtn(chain)
}

export default initTxPageScript
