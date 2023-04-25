import $ from 'jquery'
import { isHexString } from 'ethers'
import { createRoot } from 'react-dom/client'

import { TransactionExplanation } from '@src/content/etherscan/components'

const genTransactionSummary = async () => {
  const txHash = $('#spanTxHash').text()

  if (!isHexString(txHash, 32)) return

  const container = $('#ContentPlaceHolder1_myTab')
  const rootEl = $('<div></div>')
  container.before(rootEl)
  createRoot(rootEl[0]).render(<TransactionExplanation txHash={txHash} />)
}

export default genTransactionSummary
