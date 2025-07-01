import $ from 'jquery'

import { store } from '@src/store'
import { waitForJQueryElement } from '@common/utils'

import {
  genDecompileInEthervmBtn,
  displayContractFundFrom,
  genComplianceScoresBtn,
  genFundFlowBtn,
  genApprovalDiagnosisBtn,
  genEnhancedLabels,
  genMainAddressLabel,
  genExportTableDataBtn
} from '../feat-scripts'
import { lazyLoad } from '../helper'

const createAccountBox = async () => {
  if ($('#md-account-box').length) return Promise.reject()
  const addressTagBox = await waitForJQueryElement(
    '#mainContent .contract-name',
    15000
  )
  const accountBox = $(
    '<div id="md-account-box" style="display: flex;align-items: center;gap: 14px; margin:14px 0"></div>'
  )
  addressTagBox.before(accountBox)
}

const initContractPageScript = async () => {
  const {
    decompileInEthervm,
    addressFunderLabel,
    complianceScores,
    fundFlow,
    approvalDiagnosis,
    enhancedLabels,
    exportTableData
  } = await store.get('options')

  if (enhancedLabels) genEnhancedLabels()
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

  if (decompileInEthervm) lazyLoad(genDecompileInEthervmBtn)
  if (addressFunderLabel) lazyLoad(displayContractFundFrom)
}

export default initContractPageScript
