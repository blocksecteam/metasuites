import { SCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import { genExportTableDataBtn } from '../feat-scripts'

const initAccountsPageScript = async (chain: string) => {
  const { exportTableData } = await store.get('options')

  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.ACCOUNTS.name)
}

export default initAccountsPageScript
