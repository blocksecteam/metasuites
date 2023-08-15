import $ from 'jquery'
import { isHexString } from 'ethers'
import { createRoot } from 'react-dom/client'

import { TransactionExplanation } from '@src/content/etherscan/components'

const genTransactionExplanation = async (chain: string) => {
  const txHash = $('#spanTxHash').text()

  if (!isHexString(txHash, 32)) return

  const status = $(
    '#ContentPlaceHolder1_maintable .card .row:nth-child(2) .col:last-child'
  ).text()
  if (status === 'Pending') return

  const container = $('#ContentPlaceHolder1_myTab')
  const rootEl = $('<div></div>')
  container.before(rootEl)
  createRoot(rootEl[0]).render(
    <TransactionExplanation tx={txHash} chain={chain} />
  )
}

export default genTransactionExplanation
