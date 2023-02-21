import { store } from '@src/store'

import { inspectTokenApprovals } from '../feat-scripts'

const initTokenApprovalCheckerPageScript = async (chain: string) => {
  const { approvalDiagnosis } = await store.get('options')

  if (approvalDiagnosis) inspectTokenApprovals(chain)
}

export default initTokenApprovalCheckerPageScript
