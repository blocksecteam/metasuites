import { SCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import { genCopyAddressBtn } from '../feat-scripts'

const initAccountsPageScript = async () => {
  const { copyAddress } = await store.get('options')

  if (copyAddress) genCopyAddressBtn(SCAN_PAGES.ACCOUNTS.name)
}

export default initAccountsPageScript
