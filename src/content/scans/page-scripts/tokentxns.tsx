import { SCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import {
  genCopyIconBtn,
  genEnhancedLabels,
  convertUTC2locale,
  genExportTableDataBtn
} from '../feat-scripts'

const initTokentxnsPageScript = async (chain: string) => {
  const { showCopyIcon, enhancedLabels, utc2locale, exportTableData } =
    await store.get('options')
  if (showCopyIcon) genCopyIconBtn(SCAN_PAGES.TOKENTXNS.name)
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(SCAN_PAGES.TOKENTXNS.name)
  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.TOKENTXNS.name)
}

export default initTokentxnsPageScript
