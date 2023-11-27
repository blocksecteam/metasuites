import browser from 'webextension-polyfill'

import { store } from '@src/store'
import {
  ETHERSCAN_PAGES,
  GET_TOKEN_APPROVAL_DATATABLE
} from '@common/constants'

import { inspectTokenApprovals, genCopyIconBtn } from '../feat-scripts'

const runScript = async (chain: string) => {
  const { approvalDiagnosis, showCopyIcon } = await store.get('options')

  if (approvalDiagnosis) inspectTokenApprovals(chain)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.TOKEN_APPROVAL_CHECKER.name)
}

const initTokenApprovalCheckerPageScript = async (chain: string) => {
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_TOKEN_APPROVAL_DATATABLE) {
      sendResponse()
      requestIdleCallback(() => runScript(chain))
    }
  })
  runScript(chain)
}

export default initTokenApprovalCheckerPageScript
