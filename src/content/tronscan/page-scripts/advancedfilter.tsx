import { store } from '@src/store'
import { TRONSCAN_PAGES } from '@common/constants'

import { genEnhancedLabels, genExportTableDataBtn } from '../feat-scripts'

const initAdvancedFilterPageScript = async () => {
  const { enhancedLabels, exportTableData } = await store.get('options')

  if (enhancedLabels) genEnhancedLabels(TRONSCAN_PAGES.ADVANCED_FILTER.name)
  if (exportTableData) {
    genExportTableDataBtn(TRONSCAN_PAGES.ADVANCED_FILTER.name)
  }
}

export default initAdvancedFilterPageScript
