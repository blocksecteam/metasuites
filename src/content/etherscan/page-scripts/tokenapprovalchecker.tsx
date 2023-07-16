import { getOptions } from '@src/store'

import { inspectTokenApprovals } from '../feat-scripts'

const initTokenApprovalCheckerPageScript = async (chain: string) => {
  const { approvalDiagnosis } = await getOptions()

  if (approvalDiagnosis) inspectTokenApprovals(chain)
}

export default initTokenApprovalCheckerPageScript
