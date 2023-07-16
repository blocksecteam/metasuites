import { SCAN_PAGES } from '@common/constants'
import { getOptions } from '@src/store'

import { genExportTableDataBtn } from '../feat-scripts'

const initAccountsPageScript = async (chain: string) => {
  const { exportTableData } = await getOptions()

  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.ACCOUNTS.name)
}

export default initAccountsPageScript
