import { OPENSEA_PAGES } from '@common/constants'
import { getOptions } from '@src/store'

import { genPhishAddressLabel } from '../feat-scripts'

const initUserPageScript = async () => {
  const { nftOwnersLabel } = await getOptions()
  if (nftOwnersLabel) genPhishAddressLabel(OPENSEA_PAGES.USER.name)
}

export default initUserPageScript
