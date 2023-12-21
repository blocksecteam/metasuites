import $ from 'jquery'
import { isHexString } from 'ethers'
import { createRoot } from 'react-dom/client'

import {
  TransactionExplanation,
  ExplainBtn
} from '@src/content/etherscan/components'
import { TX_EXPLAIN_SUPPORT_LIST } from '@common/constants'

const startUI = async (chain: string) => {
  if (!TX_EXPLAIN_SUPPORT_LIST.includes(chain)) return
  const txHash = $('#spanTxHash').text()

  if (!isHexString(txHash, 32)) return

  const status = $(
    '#ContentPlaceHolder1_maintable .card .row:nth-child(2) .col:last-child'
  ).text()
  if (status === 'Pending') return

  const container = $('#ContentPlaceHolder1_maintable > .card:nth-child(1)')
  const divider = $('<hr class="opacity-75 mt-0 mb-5"></hr>')
  const rootEl = $('<div class="row mb-4"></div>')
  container.prepend(divider)
  container.prepend(rootEl)
  createRoot(rootEl[0]).render(
    <TransactionExplanation tx={txHash} chain={chain} />
  )
}

const genTransactionExplanationBtn = (chain: string) => {
  if (!TX_EXPLAIN_SUPPORT_LIST.includes(chain)) return

  const container = $('#ContentPlaceHolder1_myTab > li[class*="ms-auto"]')

  const rootEl = $('<li class="nav-item snap-align-start"></li>')
  container.before(rootEl)

  createRoot(rootEl[0]).render(<ExplainBtn onClick={() => startUI(chain)} />)
}

export default genTransactionExplanationBtn
