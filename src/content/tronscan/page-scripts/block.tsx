import { store } from '@src/store'

import { genEnhancedLabels, genExportTableDataBtn } from '../feat-scripts'

const initBlockPageScript = async () => {
  const { enhancedLabels, exportTableData } = await store.get('options')

  if (enhancedLabels) genEnhancedLabels()
  if (exportTableData) genExportTableDataBtn()
}

export default initBlockPageScript
