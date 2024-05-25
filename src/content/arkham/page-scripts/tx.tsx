import { store } from '@src/store'

import { renderPhalconExplorerButton } from '../feat-scripts'
import { lazyLoad } from '../helper'

const initTxPageScript = async () => {
  const { quick2Parsers } = await store.get('options')

  lazyLoad(() => {
    if (quick2Parsers) renderPhalconExplorerButton()
  }, 'a[class^="transaction_externalLink"]')
}

export default initTxPageScript
