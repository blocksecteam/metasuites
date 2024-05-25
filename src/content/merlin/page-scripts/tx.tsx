import { store } from '@src/store'

import { renderPhalconExplorerButton } from '../feat-scripts'
import { lazyLoad } from '../helper'

const initTxPageScript = async () => {
  const { quick2Parsers } = await store.get('options')

  if (quick2Parsers) lazyLoad(renderPhalconExplorerButton)
}

export default initTxPageScript
