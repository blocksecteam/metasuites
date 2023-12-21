import $ from 'jquery'

import { store } from '@src/store'

import {
  genFundFlowBtn,
  genComplianceScoresBtn,
  genDeBankBtn
} from '../feat-scripts'

const createAccountBox = () => {
  if ($('#md-account-box').length) return Promise.reject()
  const breadcrumbEl = $('#address .breadcrumb-up')
  const accountBox = $(
    '<div id="md-account-box" class="custom-container" style="display: flex;align-items: center;gap: 14px;margin-bottom: 14px;"></div>'
  )
  breadcrumbEl.after(accountBox)
  return Promise.resolve()
}

const initAddressPageScript = async (chain: string) => {
  const { complianceScores, fundFlow, quick2debank } = await store.get(
    'options'
  )

  createAccountBox().then(() => {
    const container = $('#md-account-box')
    if (complianceScores) genComplianceScoresBtn(chain, container)
    if (fundFlow) genFundFlowBtn(chain, container)
    if (quick2debank) genDeBankBtn(chain, container)
  })
}

export default initAddressPageScript
