import { store } from '@src/store'
import { ETHERSCAN_PAGES } from '@common/constants'

import {
  genQuick2ParsersBtn,
  convertUTC2locale,
  genCopyIconBtn,
  genTxPageAddressLabels
} from '../feat-scripts'

const initTxPageScript = async (chain: string) => {
  const { quick2Parsers, utc2locale, showCopyIcon, enhancedLabels } =
    await store.get('options')

  if (quick2Parsers) genQuick2ParsersBtn(chain)
  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.TX.name)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.TX.name)
  if (enhancedLabels) genTxPageAddressLabels(chain)
}

export default initTxPageScript
