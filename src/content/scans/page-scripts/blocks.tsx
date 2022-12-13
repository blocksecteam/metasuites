import { store } from '@src/store'
import { SCAN_PAGES } from '@common/constants'

import { convertUTC2locale } from '../feat-scripts'

const initBlocksPageScript = async () => {
  const { utc2locale } = await store.get('options')

  if (utc2locale) convertUTC2locale(SCAN_PAGES.BLOCKS.name)
}

export default initBlocksPageScript
