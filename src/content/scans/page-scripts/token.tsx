import { SCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import {
  genCopyAddressBtn,
  genEnhancedLabels,
  convertUTC2locale,
  genEnhancedSignatures,
  genDownloadSourceCodeBtn,
  genQuickViewSourceCodeBtn,
  displayTokenPrice,
  genExportTableDataBtn
} from '../feat-scripts'

const initTokenPageScript = async (chain: string) => {
  const {
    copyAddress,
    enhancedLabels,
    utc2locale,
    enhancedSignatures,
    contractSourcecode,
    dethCode,
    nftFloorPrice,
    exportTableData
  } = await store.get('options')

  if (copyAddress) genCopyAddressBtn(SCAN_PAGES.TOKEN.name)
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(SCAN_PAGES.TOKEN.name)
  if (enhancedSignatures) genEnhancedSignatures(chain)
  if (contractSourcecode) genDownloadSourceCodeBtn(chain)
  if (dethCode) genQuickViewSourceCodeBtn(chain)
  if (nftFloorPrice) displayTokenPrice()
  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.TOKEN.name)
}

export default initTokenPageScript
