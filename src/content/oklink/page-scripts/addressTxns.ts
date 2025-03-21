import { store } from '@src/store'
import { genMainAddressLabel } from '../feat-scripts'
import addressTxnsPage from '../constant/addressTxnsPage'

const initAddressTxnsPageScript = () => {
  requestIdleCallback(async () => {
    const { enhancedLabels } = await store.get('options')
    if (enhancedLabels) {
      genMainAddressLabel(addressTxnsPage.address)
    }
  })
}

export default initAddressTxnsPageScript
