import { store } from '@src/store'

import { lazyLoad } from '../helper'

import { genQuick2ParsersBtn } from '../feat-scripts'

const initTxPageScript = async () => {
  const { quick2Parsers } = await store.get('options')

  if (quick2Parsers) lazyLoad(genQuick2ParsersBtn)
}

export default initTxPageScript
