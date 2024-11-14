import { store } from '@src/store'
import { genMainAddressFortaLabels, genMainAddressLabel } from '../feat-scripts'
import addressTxnsPage from '../constant/addressTxnsPage'

const initAddressTxnsPageScript = () => {
  requestIdleCallback(async () => {
    const { enhancedLabels, enhancedFortaLabels } = await store.get('options')
    if (enhancedLabels) {
      genMainAddressLabel(addressTxnsPage.address)
    }
    if (enhancedFortaLabels) genMainAddressFortaLabels(addressTxnsPage.address)
  })
}

export default initAddressTxnsPageScript
