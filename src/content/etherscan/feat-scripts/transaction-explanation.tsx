import $ from 'jquery'
import { isHexString } from 'ethers'
import { createRoot } from 'react-dom/client'

import { TransactionExplanation } from '@src/content/etherscan/components'
import { TX_EXPLAIN_SUPPORT_LIST } from '@common/constants'

const genTransactionExplanation = async (chain: string) => {
  if (!TX_EXPLAIN_SUPPORT_LIST.includes(chain)) return
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
