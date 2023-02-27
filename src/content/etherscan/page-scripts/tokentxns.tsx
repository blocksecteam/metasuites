import { SCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import {
  genEnhancedLabels,
  convertUTC2locale,
  genExportTableDataBtn,
  genCopyIconBtn,
  scanTxnFortaAlert
} from '../feat-scripts'

const initTokentxnsPageScript = async (chain: string) => {
  const {
    enhancedLabels,
    utc2locale,
    exportTableData,
    showCopyIcon,
    txnFortaAlert
  } = await store.get('options')
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(SCAN_PAGES.TOKENTXNS.name)
  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.TOKENTXNS.name)
  if (showCopyIcon) genCopyIconBtn(SCAN_PAGES.TOKENTXNS.name)
  if (txnFortaAlert) scanTxnFortaAlert(chain, SCAN_PAGES.TOKENTXNS.name)
}

export default initTokentxnsPageScript
