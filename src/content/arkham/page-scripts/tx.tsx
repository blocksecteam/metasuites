import { store } from '@src/store'

import { renderPhalconExplorerButton } from '../feat-scripts'
import { ARKHAM_SELECTORS, anyOf, lazyLoad } from '../helper'

const initTxPageScript = async () => {
  const { quick2Parsers } = await store.get('options')

  lazyLoad(() => {
    if (quick2Parsers) renderPhalconExplorerButton()
  }, anyOf(ARKHAM_SELECTORS.txExternalLink))
}

export default initTxPageScript
