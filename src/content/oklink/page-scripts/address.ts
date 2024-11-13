import { store } from '@src/store'
import {
  genComplianceScoresBtn,
  genFundFlow,
  genMainAddressFortaLabels,
  genMainAddressLabel
} from '../feat-scripts'
import addressPage from '../constant/addressPage'

const initAddressPageScript = () => {
  requestIdleCallback(async () => {
    const { complianceScores, fundFlow, enhancedLabels, enhancedFortaLabels } =
      await store.get('options')
    if (complianceScores) genComplianceScoresBtn()
    if (fundFlow) genFundFlow()
    if (enhancedLabels) {
      genMainAddressLabel(addressPage.address)
    }
    if (enhancedFortaLabels) genMainAddressFortaLabels(addressPage.address)
  })
}

export default initAddressPageScript
