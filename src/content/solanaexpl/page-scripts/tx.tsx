import { store } from '@src/store'

import { renderTxPageAddressLabels } from '../feat-scripts'
import { lazyLoad } from '../helper'

const initTxPageScript = async () => {
  const { enhancedLabels } = await store.get('options')
  lazyLoad(() => {
    if (enhancedLabels) renderTxPageAddressLabels()
  }, `body > div.main-content > div:nth-of-type(3) > div > div > span[class*="spinner"]`)
}

export default initTxPageScript
