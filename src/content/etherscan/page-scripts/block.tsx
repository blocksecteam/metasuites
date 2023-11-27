import { store } from '@src/store'
import { ETHERSCAN_PAGES } from '@common/constants'

import {
  convertUTC2locale,
  genAlternativeBlockExplorersBtn
} from '../feat-scripts'

const initBlockPageScript = async (chain: string) => {
  const { utc2locale, alternativeBlockExplorers } = await store.get('options')

  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.BLOCK.name)
  if (alternativeBlockExplorers)
    genAlternativeBlockExplorersBtn(ETHERSCAN_PAGES.BLOCK.name, chain)
}

export default initBlockPageScript
