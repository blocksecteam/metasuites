import { store } from '@src/store'

/** main features */
import { genMainAddressLabel } from '../feat-scripts'

const initAddressPageScript = async (chain: string, addressHash: string) => {
  /** get user options */
  const { enhancedLabels } = await store.get('options')

  if (enhancedLabels) {
    genMainAddressLabel(chain, addressHash)
  }
}

export default initAddressPageScript
