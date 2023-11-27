import $ from 'jquery'

import { store } from '@src/store'

import {
  genComplianceScoresBtn,
  genFundFlowBtn,
  genApprovalDiagnosisBtn,
  genEnhancedLabels,
  genApprovalRiskLabels,
  genMainAddressLabel,
  genExportTableDataBtn
} from '../feat-scripts'
import { lazyLoad } from '../helper'

const createAccountBox = () => {
  if ($('#md-account-box').length) return Promise.reject()
  const addressTagBox = $('#mainContent .address-tag-box')
  const accountBox = $(
    '<div id="md-account-box" style="display: flex;align-items: center;gap: 14px;margin:14px 0"></div>'
  )
  addressTagBox.before(accountBox)
  return Promise.resolve()
}

const initAddressPageScript = async () => {
  /** get user options */
  const {
    complianceScores,
    fundFlow,
    enhancedLabels,
    approvalDiagnosis,
    exportTableData
  } = await store.get('options')

  if (enhancedLabels) genEnhancedLabels()

  if (approvalDiagnosis) genApprovalRiskLabels()

  if (exportTableData) genExportTableDataBtn()

  lazyLoad(
    () =>
      createAccountBox().then(() => {
        const container = $('#md-account-box')
        if (complianceScores) genComplianceScoresBtn(container)
        if (fundFlow) genFundFlowBtn(container)
        if (approvalDiagnosis) genApprovalDiagnosisBtn(container)
        if (enhancedLabels) genMainAddressLabel()
      }),
    '#mainContent main .row .card #loadingVideo'
  )
}

export default initAddressPageScript
