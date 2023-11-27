import { store } from '@src/store'
import { ETHERSCAN_PAGES } from '@common/constants'

import {
  genQuick2ParsersBtn,
  convertUTC2locale,
  genAlternativeBlockExplorersBtn,
  genTxFortaAlertTip,
  genCopyIconBtn,
  genTxPageAddressLabels,
  genTransactionExplanation
} from '../feat-scripts'

const initTxPageScript = async (chain: string) => {
  const {
    quick2Parsers,
    utc2locale,
    alternativeBlockExplorers,
    txnFortaAlert,
    showCopyIcon,
    enhancedLabels,
    txSummary
  } = await store.get('options')
  if (quick2Parsers) genQuick2ParsersBtn(chain)
  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.TX.name)
  if (alternativeBlockExplorers)
    genAlternativeBlockExplorersBtn(ETHERSCAN_PAGES.TX.name, chain)
  if (txnFortaAlert) genTxFortaAlertTip(chain)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.TX.name)
  if (enhancedLabels) genTxPageAddressLabels(chain)
  if (txSummary) genTransactionExplanation(chain)
}

export default initTxPageScript
