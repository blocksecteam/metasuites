import { SCAN_PAGES } from '@common/constants'
import { getOptions } from '@src/store'
import { isSupportSimulator } from '@common/utils'

import {
  genCopyIconBtn,
  genEnhancedLabels,
  convertUTC2locale,
  genEnhancedSignatures,
  genDownloadSourceCodeBtn,
  genQuickViewSourceCodeBtn,
  displayTokenPrice,
  genExportTableDataBtn,
  scanTxnFortaAlert,
  genContractPrivateVariables,
  formatWriteContractParams,
  genDecompileInDedaubBtn,
  genDecompileInEthervmBtn,
  genProxyContractLog,
  genSimulateBtn,
  genContractVariableLogsBtn
} from '../feat-scripts'

const initTokenPageScript = async (chain: string) => {
  const {
    showCopyIcon,
    enhancedLabels,
    utc2locale,
    enhancedSignatures,
    contractSourcecode,
    dethCode,
    nftFloorPrice,
    exportTableData,
    txnFortaAlert,
    privateVariables,
    formatContractParams,
    decompileInDedaub,
    decompileInEthervm,
    proxyLogs,
    txSimulator,
    variableLogs
  } = await getOptions()
  if (showCopyIcon) genCopyIconBtn(SCAN_PAGES.TOKEN.name)
  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(SCAN_PAGES.TOKEN.name)
  if (enhancedSignatures) genEnhancedSignatures(chain)
  if (contractSourcecode) genDownloadSourceCodeBtn(chain)
  if (dethCode) genQuickViewSourceCodeBtn(chain)
  if (nftFloorPrice) displayTokenPrice()
  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.TOKEN.name)
  if (txnFortaAlert) scanTxnFortaAlert(chain, SCAN_PAGES.TOKEN.name)
  if (privateVariables) genContractPrivateVariables(chain)
  if (formatContractParams) formatWriteContractParams()
  if (decompileInDedaub) genDecompileInDedaubBtn(chain)
  if (decompileInEthervm) genDecompileInEthervmBtn(chain)
  if (proxyLogs) genProxyContractLog(chain)
  if (txSimulator && isSupportSimulator(chain)) genSimulateBtn(chain)
  if (variableLogs) genContractVariableLogsBtn(chain)
}

export default initTokenPageScript
