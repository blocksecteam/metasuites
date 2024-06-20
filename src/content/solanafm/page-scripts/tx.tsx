import { store } from '@src/store'

import {
  renderTxPageAddressLabels,
  renderAlternativeParsers
} from '../feat-scripts'
import { lazyLoad } from '../helper'

const initTxPageScript = async () => {
  const { enhancedLabels, quick2Parsers } = await store.get('options')
  lazyLoad(() => {
    if (enhancedLabels) renderTxPageAddressLabels()
    if (quick2Parsers) renderAlternativeParsers()
  }, '[data-testid="oval-loading"]')
}

export default initTxPageScript
