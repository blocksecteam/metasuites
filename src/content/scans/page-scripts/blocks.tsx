import { store } from '@src/store'
import { SCAN_PAGES } from '@common/constants'

import { convertUTC2locale, genExportTableDataBtn } from '../feat-scripts'

const initBlocksPageScript = async (chain: string) => {
  const { utc2locale, exportTableData } = await store.get('options')

  if (utc2locale) convertUTC2locale(SCAN_PAGES.BLOCKS.name)
  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.BLOCKS.name)
}

export default initBlocksPageScript
