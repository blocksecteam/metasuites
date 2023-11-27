import { ETHERSCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import {
  genCopyIconBtn,
  genEnhancedLabels,
  convertUTC2locale,
  genExportTableDataBtn,
  scanTxnFortaAlert
} from '../feat-scripts'

const initTokentxnsPageScript = async (chain: string) => {
  const {
    showCopyIcon,
    enhancedLabels,
    utc2locale,
    exportTableData,
    txnFortaAlert
  } = await store.get('options')
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.TOKENTXNS.name)
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.TOKENTXNS.name)
  if (exportTableData)
    genExportTableDataBtn(chain, ETHERSCAN_PAGES.TOKENTXNS.name)
  if (txnFortaAlert) scanTxnFortaAlert(chain, ETHERSCAN_PAGES.TOKENTXNS.name)
}

export default initTokentxnsPageScript
