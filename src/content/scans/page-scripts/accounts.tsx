import { ETHERSCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import { genCopyIconBtn, genExportTableDataBtn } from '../feat-scripts'

const initAccountsPageScript = async (chain: string) => {
  const { showCopyIcon, exportTableData } = await store.get('options')

  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.ACCOUNTS.name)
  if (exportTableData)
    genExportTableDataBtn(chain, ETHERSCAN_PAGES.ACCOUNTS.name)
}

export default initAccountsPageScript
