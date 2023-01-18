import { store } from '@src/store'
import { SCAN_PAGES } from '@common/constants'

import {
  convertUTC2locale,
  genAlternativeBlockExplorersBtn
} from '../feat-scripts'

const initBlockPageScript = async (chain: string) => {
  const { utc2locale, alternativeBlockExplorers } = await store.get('options')

  if (utc2locale) convertUTC2locale(SCAN_PAGES.BLOCK.name)
  if (alternativeBlockExplorers)
    genAlternativeBlockExplorersBtn(SCAN_PAGES.BLOCK.name, chain)
}

export default initBlockPageScript
