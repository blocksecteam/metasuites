import { chromeEvent } from '@common/event'
import {
  GET_NFT_RARITY_RANK,
  GET_NFT_RISK,
  GET_NFT_USER_LABELS
} from '@common/constants'
import commonApi from '@common/api'

export default function initNFTRequest() {
  chromeEvent.on(GET_NFT_RARITY_RANK, async params => {
    return await commonApi.getNFTRarityRank(params)
  })

  chromeEvent.on(GET_NFT_RISK, async params => {
    return await commonApi.getNFTRisk(params)
  })

  chromeEvent.on(GET_NFT_USER_LABELS, async params => {
    return await commonApi.getNFTUserLabels(params)
  })
}
