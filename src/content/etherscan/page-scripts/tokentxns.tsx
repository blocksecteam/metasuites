import { ETHERSCAN_PAGES } from '@common/constants'
import { store } from '@src/store'

import {
  genEnhancedLabels,
  convertUTC2locale,
  genCopyIconBtn,
  genTransactionHashPhalconLink,
  hideZeroValueTransfers
} from '../feat-scripts'

const initTokentxnsPageScript = async (chain: string) => {
  const {
    enhancedLabels,
    utc2locale,
    showCopyIcon,
    quick2Parsers,
    hideZeroValueTransfers: hideZeroValueEnabled
  } = await store.get('options')
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.TOKENTXNS.name)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.TOKENTXNS.name)
  if (quick2Parsers)
    genTransactionHashPhalconLink(ETHERSCAN_PAGES.TOKENTXNS.name)
  if (hideZeroValueEnabled)
    hideZeroValueTransfers(ETHERSCAN_PAGES.TOKENTXNS.name)
}

export default initTokentxnsPageScript
