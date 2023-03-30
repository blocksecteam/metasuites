import { SCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import {
  genEnhancedLabels,
  convertUTC2locale,
  genExportTableDataBtn,
  genCopyIconBtn
} from '../feat-scripts'

const initTxsInternalPageScript = async (chain: string) => {
  const { enhancedLabels, utc2locale, exportTableData, showCopyIcon } =
    await store.get('options')
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(SCAN_PAGES.TXS_INTERNAL.name)
  if (exportTableData)
    genExportTableDataBtn(chain, SCAN_PAGES.TXS_INTERNAL.name)
  if (showCopyIcon) genCopyIconBtn(SCAN_PAGES.TXS_INTERNAL.name)
}

export default initTxsInternalPageScript
