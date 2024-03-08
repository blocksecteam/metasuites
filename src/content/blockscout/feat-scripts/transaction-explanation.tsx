import $ from 'jquery'
import { TX_EXPLAIN_SUPPORT_LIST } from '@common/constants'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { TransactionExplanation } from '@src/content/blockscout/components'
import { isHexString } from 'ethers'
import { page } from '../utils'

const startUI = async (chain: string, valueRoot: Root, txHash: string) => {
  if (!TX_EXPLAIN_SUPPORT_LIST.includes(chain)) return
  const txInfoLabelEl = $('#meta-suites__tx-info-label')
  const txInfoValueEl = $('#meta-suites__tx-info-value')
  const txInfoDividerEl = $('#meta-suites__details-info-item-divider')

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

const genTransactionExplanationBtn = async (chain: string, txHash: string) => {
  if (!TX_EXPLAIN_SUPPORT_LIST.includes(chain)) return

  const isDataLoaded = await page.waitUntilDataLoaded([
    '#meta-suites__tx-info-label'
  ])

  if (!isDataLoaded) return

  const txInfoLabelEl = $('#meta-suites__tx-info-label')
  const txStatus = txInfoLabelEl.data('status')

  if (!(txStatus === 'ok' || txStatus === 'error')) {
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
    <TransactionExplanation.Button
      onClick={() => startUI(chain, valueRoot, txHash)}
    />
  )
}

export default genTransactionExplanationBtn
