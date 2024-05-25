import browser from 'webextension-polyfill'

import { store } from '@src/store'
import {
  ETHERSCAN_PAGES,
  GET_TOKEN_APPROVAL_DATATABLE
} from '@common/constants'

import {
  inspectTokenApprovals,
  genCopyIconBtn,
  genTransactionHashPhalconLink
} from '../feat-scripts'

const execute = async (chain: string) => {
  const { approvalDiagnosis, showCopyIcon, quick2Parsers } = await store.get(
    'options'
  )

  if (approvalDiagnosis) inspectTokenApprovals(chain)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.TOKEN_APPROVAL_CHECKER.name)
  if (quick2Parsers)
    genTransactionHashPhalconLink(ETHERSCAN_PAGES.TOKEN_APPROVAL_CHECKER.name)
}

const initTokenApprovalCheckerPageScript = async (chain: string) => {
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_TOKEN_APPROVAL_DATATABLE) {
      sendResponse()
      requestIdleCallback(() => execute(chain))
    }
  })
  execute(chain)
}

export default initTokenApprovalCheckerPageScript
