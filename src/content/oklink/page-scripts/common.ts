import { store } from '@src/store'
import {
  genEnhancedLabels,
  genEnhancedSignatures,
  genExportTableDataBtn,
  getTxnFortaAlert
} from '../feat-scripts'

const initCommonPageScript = () => {
  requestIdleCallback(async () => {
    const {
      enhancedLabels,
      exportTableData,
      txnFortaAlert,
      enhancedSignatures
    } = await store.get('options')
    if (enhancedLabels) genEnhancedLabels()
    if (exportTableData) genExportTableDataBtn()
    if (txnFortaAlert) getTxnFortaAlert()
    if (enhancedSignatures) genEnhancedSignatures()
  })
}

export default initCommonPageScript
