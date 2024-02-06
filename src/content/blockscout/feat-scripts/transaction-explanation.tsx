import $ from 'jquery'
import { TX_EXPLAIN_SUPPORT_LIST } from '@common/constants'
import { createRoot } from 'react-dom/client'
import {
  ExplainBtn,
  TransactionExplanation
} from '@src/content/blockscout/components'
import { isHexString } from 'ethers'

const startUI = async (chain: string) => {
  if (!TX_EXPLAIN_SUPPORT_LIST.includes(chain)) return
  // const txHash = $('#spanTxHash').text()
  // TODO @tom2drum get tx hash
  const txHash =
    '0xaa4d6f0c46cba75c83cb5ee1d8133cf92b4acff6be25f726a6d12beede4c220f'

  if (!isHexString(txHash, 32)) return

  // TODO @tom2drum check tx status
  // const status = $(
  //   '#ContentPlaceHolder1_maintable .card .row:nth-child(2) .col:last-child'
  // ).text()
  // if (status === 'Pending') return

  const container = $('.metasuites')
  const divider = $('<hr/>')
  const rootEl = $('<div class="metasuites__tx-explaination"></div>')
  container.prepend(divider)
  container.prepend(rootEl)
  createRoot(rootEl[0]).render(
    <TransactionExplanation tx={txHash} chain={chain} />
  )
}

const genTransactionExplanationBtn = (chain: string) => {
  if (!TX_EXPLAIN_SUPPORT_LIST.includes(chain)) return

  const container = $('main')

  const rootEl = $('<div class="metasuites"></div>')
  container.before(rootEl)

  createRoot(rootEl[0]).render(<ExplainBtn onClick={() => startUI(chain)} />)
}

export default genTransactionExplanationBtn
