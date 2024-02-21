import $ from 'jquery'
import { TX_EXPLAIN_SUPPORT_LIST } from '@common/constants'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { TransactionExplanation } from '@src/content/blockscout/components'
import { isHexString } from 'ethers'

const startUI = async (chain: string, valueRoot: Root) => {
  if (!TX_EXPLAIN_SUPPORT_LIST.includes(chain)) return
  const txInfoLabelEl = $('#meta-suites__tx-info-label')
  const txInfoValueEl = $('#meta-suites__tx-info-value')
  const txInfoDividerEl = $('#meta-suites__details-info-item-divider')

  const txHash = txInfoLabelEl.data('hash')

  if (!isHexString(txHash, 32)) return

  const onHide = () => {
    txInfoLabelEl.css('display', 'none')
    txInfoValueEl.css('display', 'none')
    txInfoDividerEl.css('display', 'none')
  }

  valueRoot.render(
    <TransactionExplanation.Message tx={txHash} chain={chain} onHide={onHide} />
  )
}

const genTransactionExplanationBtn = (chain: string) => {
  if (!TX_EXPLAIN_SUPPORT_LIST.includes(chain)) return

  const txInfoLabelEl = $('#meta-suites__tx-info-label')
  const txHash = txInfoLabelEl.data('hash')
  const txStatus = txInfoLabelEl.data('status')

  if (!txHash || !(txStatus === 'ok' || txStatus === 'error')) {
    return
  }

  const txInfoValueEl = $('#meta-suites__tx-info-value')
  const txInfoDividerEl = $('#meta-suites__details-info-item-divider')

  txInfoLabelEl.css('display', 'block')
  txInfoValueEl.css('display', 'block')
  txInfoDividerEl.css('display', 'block')

  createRoot(txInfoLabelEl[0]).render(<TransactionExplanation.Label />)

  const valueRoot = createRoot(txInfoValueEl[0])
  valueRoot.render(
    <TransactionExplanation.Button onClick={() => startUI(chain, valueRoot)} />
  )
}

export default genTransactionExplanationBtn
