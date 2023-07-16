import { SCAN_PAGES } from '@common/constants'
import { getOptions } from '@src/store'

import { genCopyIconBtn, genExportTableDataBtn } from '../feat-scripts'

const initAccountsPageScript = async (chain: string) => {
  const { showCopyIcon, exportTableData } = await getOptions()

  if (showCopyIcon) genCopyIconBtn(SCAN_PAGES.ACCOUNTS.name)
  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.ACCOUNTS.name)
}

export default initAccountsPageScript
