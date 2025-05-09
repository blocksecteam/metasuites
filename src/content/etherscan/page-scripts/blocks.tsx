import { store } from '@src/store'
import { ETHERSCAN_PAGES } from '@common/constants'

import { convertUTC2locale, genCopyIconBtn } from '../feat-scripts'

const initBlocksPageScript = async () => {
  const { utc2locale, showCopyIcon } = await store.get('options')

  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.BLOCKS.name)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.BLOCKS.name)
}

export default initBlocksPageScript
