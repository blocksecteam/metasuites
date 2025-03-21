import { store } from '@src/store'
import { ETHERSCAN_PAGES } from '@common/constants'

import {
  genEnhancedLabels,
  genEnhancedSignatures,
  convertUTC2locale,
  genCopyIconBtn,
  genExportTableDataBtn,
  genTransactionHashPhalconLink
} from '../feat-scripts'

const initTxsPageScript = async (chain: string) => {
  const {
    enhancedLabels,
    enhancedSignatures,
    utc2locale,
    showCopyIcon,
    exportTableData,
    quick2Parsers
  } = await store.get('options')

  if (enhancedLabels) {
    genEnhancedLabels(chain)
  }
  if (enhancedSignatures) {
    genEnhancedSignatures(chain)
  }
  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.TXS.name)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.TXS.name)
  if (exportTableData) genExportTableDataBtn(chain, ETHERSCAN_PAGES.TXS.name)
  if (quick2Parsers) genTransactionHashPhalconLink(ETHERSCAN_PAGES.TXS.name)
}

export default initTxsPageScript
