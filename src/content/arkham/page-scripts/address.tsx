import { store } from '@src/store'

import { renderMainAddressLabel } from '../feat-scripts'
import { ARKHAM_SELECTORS, anyOf, lazyLoad } from '../helper'

const initAddressPageScript = async () => {
  const { enablePrivateLabels } = await store.get('options')
  lazyLoad(() => {
    if (enablePrivateLabels) renderMainAddressLabel()
  }, anyOf(ARKHAM_SELECTORS.addressTitle))
}

export default initAddressPageScript
