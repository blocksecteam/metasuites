import { store } from '@src/store'
import { ETHERSCAN_PAGES } from '@common/constants'

import {
  convertUTC2locale,
  genExportTableDataBtn,
  genCopyIconBtn
} from '../feat-scripts'

const initBlocksForkedPageScript = async (chain: string) => {
  const { utc2locale, exportTableData, showCopyIcon } = await store.get(
    'options'
  )

  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.BLOCKS_FORKED.name)
  if (exportTableData)
    genExportTableDataBtn(chain, ETHERSCAN_PAGES.BLOCKS_FORKED.name)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.BLOCKS_FORKED.name)
}

export default initBlocksForkedPageScript
