import { store } from '@src/store'

/** main features */
import { genMainAddressLabel } from '../feat-scripts'

const initAddressPageScript = async (chain: string) => {
  /** get user options */
  const { enhancedLabels } = await store.get('options')

  if (enhancedLabels) {
    genMainAddressLabel(chain)
    // TODO @tom2drum add enhanced labels
    // genEnhancedLabels(chain)
  }
}

export default initAddressPageScript
