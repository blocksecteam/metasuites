import { ETHERSCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import {
  genEnhancedLabels,
  convertUTC2locale,
  genExportTableDataBtn,
  genCopyIconBtn,
  genTransactionHashPhalconLink
} from '../feat-scripts'

const initNftTransfersPageScript = async (chain: string) => {
  const {
    enhancedLabels,
    utc2locale,
    exportTableData,
    showCopyIcon,
    quick2Parsers
  } = await store.get('options')
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.NFT_TRANSFERS.name)
  if (exportTableData)
    genExportTableDataBtn(chain, ETHERSCAN_PAGES.NFT_TRANSFERS.name)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.NFT_TRANSFERS.name)
  if (quick2Parsers)
    genTransactionHashPhalconLink(ETHERSCAN_PAGES.NFT_TRANSFERS.name)
}

export default initNftTransfersPageScript
