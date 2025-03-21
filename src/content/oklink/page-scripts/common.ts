import { store } from '@src/store'
import {
  genEnhancedLabels,
  genEnhancedSignatures,
  genExportTableDataBtn
} from '../feat-scripts'

const initCommonPageScript = () => {
  requestIdleCallback(async () => {
    const { enhancedLabels, exportTableData, enhancedSignatures } =
      await store.get('options')
    if (enhancedLabels) genEnhancedLabels()
    if (exportTableData) genExportTableDataBtn()
    if (enhancedSignatures) genEnhancedSignatures()
  })
}

export default initCommonPageScript
