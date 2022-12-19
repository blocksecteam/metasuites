import { SCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import {
  genCopyAddressBtn,
  genEnhancedLabels,
  convertUTC2locale
} from '../feat-scripts'

const initTokentxnsPageScript = async (chain: string) => {
  const { copyAddress, enhancedLabels, utc2locale } = await store.get('options')
  if (copyAddress) genCopyAddressBtn(SCAN_PAGES.TOKENTXNS.name)
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(SCAN_PAGES.TOKENTXNS.name)
}

export default initTokentxnsPageScript
