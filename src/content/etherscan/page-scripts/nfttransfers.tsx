import { SCAN_PAGES } from '@common/constants'
import { getOptions } from '@src/store'

import {
  genEnhancedLabels,
  convertUTC2locale,
  genExportTableDataBtn,
  genCopyIconBtn
} from '../feat-scripts'

const initNftTransfersPageScript = async (chain: string) => {
  const { enhancedLabels, utc2locale, exportTableData, showCopyIcon } =
    await getOptions()
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(SCAN_PAGES.NFT_TRANSFERS.name)
  if (exportTableData)
    genExportTableDataBtn(chain, SCAN_PAGES.NFT_TRANSFERS.name)
  if (showCopyIcon) genCopyIconBtn(SCAN_PAGES.NFT_TRANSFERS.name)
}

export default initNftTransfersPageScript
