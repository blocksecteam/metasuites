import { OPENSEA_PAGES } from '@common/constants'
import { store } from '@src/store'

import { genPhishAddressLabel, genRarityRankLabel } from '../feat-scripts'

const initAssetsPageScript = async () => {
  const { nftRarity, nftOwnersLabel } = await store.get('options')

  if (nftRarity) genRarityRankLabel(OPENSEA_PAGES.ASSETS.name)

  if (nftOwnersLabel) genPhishAddressLabel(OPENSEA_PAGES.ASSETS.name)
}

export default initAssetsPageScript
