import { SCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import { genCopyAddressBtn, genExportTableDataBtn } from '../feat-scripts'

const initAccountsPageScript = async (chain: string) => {
  const { copyAddress, exportTableData } = await store.get('options')

  if (copyAddress) genCopyAddressBtn(SCAN_PAGES.ACCOUNTS.name)
  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.ACCOUNTS.name)
}

export default initAccountsPageScript
