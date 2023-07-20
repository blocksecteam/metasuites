import { OPENSEA_PAGES } from '@common/constants'
import { store } from '@src/store'

import { genPhishAddressLabel } from '../feat-scripts'

const initUserPageScript = async () => {
  const { nftOwnersLabel } = await store.get('options')
  if (nftOwnersLabel) genPhishAddressLabel(OPENSEA_PAGES.USER.name)
}

export default initUserPageScript
