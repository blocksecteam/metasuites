import { store } from '@src/store'
import {
  genComplianceScoresBtn,
  genFundFlow,
  genMainAddressLabel,
  getContractDeveloper
} from '../feat-scripts'
import addressPage from '../constant/addressPage'

const initAddressPageScript = () => {
  requestIdleCallback(async () => {
    const { complianceScores, fundFlow, enhancedLabels } = await store.get(
      'options'
    )
    if (complianceScores) genComplianceScoresBtn()
    if (fundFlow) genFundFlow()
    if (enhancedLabels) {
      genMainAddressLabel(addressPage.address)
    }
    if (addressPage.tab === 'contract') {
      getContractDeveloper(addressPage.address)
    }
  })
}

export default initAddressPageScript
