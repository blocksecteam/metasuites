import { store } from '@src/store'

import { renderMainAddressLabel } from '../feat-scripts'
import { lazyLoad } from '../helper'

const initAddressPageScript = async () => {
  const { enablePrivateLabels } = await store.get('options')
  lazyLoad(() => {
    if (enablePrivateLabels) renderMainAddressLabel()
  }, 'div[class^="Header_displayNameAddress"]:first')
}

export default initAddressPageScript
