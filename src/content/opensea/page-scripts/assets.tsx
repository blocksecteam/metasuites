import { OPENSEA_PAGES } from '@common/constants'
import { getOptions } from '@src/store'

import { genPhishAddressLabel, genRarityRankLabel } from '../feat-scripts'

const initAssetsPageScript = async () => {
  const { nftRarity, nftOwnersLabel } = await getOptions()

  if (nftRarity) genRarityRankLabel(OPENSEA_PAGES.ASSETS.name)

  if (nftOwnersLabel) genPhishAddressLabel(OPENSEA_PAGES.ASSETS.name)
}

export default initAssetsPageScript
