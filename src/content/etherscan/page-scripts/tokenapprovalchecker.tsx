import { store } from '@src/store'

import { ETHERSCAN_PAGES } from '@common/constants'

import {
  inspectTokenApprovals,
  genTransactionHashPhalconLink
} from '../feat-scripts'

const initTokenApprovalCheckerPageScript = async (chain: string) => {
  const { approvalDiagnosis, quick2Parsers } = await store.get('options')

  if (approvalDiagnosis) inspectTokenApprovals(chain)
  if (quick2Parsers)
    genTransactionHashPhalconLink(ETHERSCAN_PAGES.TOKEN_APPROVAL_CHECKER.name)
}

export default initTokenApprovalCheckerPageScript
