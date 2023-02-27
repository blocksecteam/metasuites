import { store } from '@src/store'
import { SCAN_PAGES } from '@common/constants'

import {
  genEnhancedLabels,
  genEnhancedSignatures,
  convertUTC2locale,
  genExportTableDataBtn,
  genCopyIconBtn,
  scanTxnFortaAlert
} from '../feat-scripts'

const initTxsPageScript = async (chain: string) => {
  const {
    enhancedLabels,
    enhancedSignatures,
    utc2locale,
    exportTableData,
    showCopyIcon,
    txnFortaAlert
  } = await store.get('options')

  if (enhancedLabels) {
    genEnhancedLabels(chain)
  }
  if (enhancedSignatures) {
    genEnhancedSignatures(chain)
  }
  if (utc2locale) convertUTC2locale(SCAN_PAGES.TXS.name)
  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.TXS.name)
  if (showCopyIcon) genCopyIconBtn(SCAN_PAGES.TXS.name)
  if (txnFortaAlert) scanTxnFortaAlert(chain, SCAN_PAGES.TXS.name)
}

export default initTxsPageScript
