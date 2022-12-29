import { OPENSEA_PAGES } from '@common/constants'
import { store } from '@src/store'

import {
  genComplianceRadarPlot,
  genRarityRankLabel,
  genPhishAddressLabel
} from '../feat-scripts'

const initCollectionPageScript = async () => {
  const { nftRarity, nftOwnersLabel, nftCollectionRisk } = await store.get(
    'options'
  )

  if (nftCollectionRisk) genComplianceRadarPlot()
  if (nftOwnersLabel) genPhishAddressLabel(OPENSEA_PAGES.ASSETS.name)
  if (nftRarity) genRarityRankLabel(OPENSEA_PAGES.COLLECTION.name)
}

export default initCollectionPageScript
