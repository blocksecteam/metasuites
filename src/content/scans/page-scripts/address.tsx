import { store } from '@src/store'
import { ETHERSCAN_PAGES } from '@common/constants'
import { isSupportSimulator } from '@common/utils'

/** main features */
import {
  genComplianceScoresBtn,
  genFundFlow,
  genEnhancedLabels,
  genDownloadSourceCodeBtn,
  genQuickViewSourceCodeBtn,
  genMainAddressLabel,
  genEnhancedSignatures,
  genDeBankBtn,
  genDecompileInDedaubBtn,
  convertUTC2locale,
  genCopyIconBtn,
  genDedaubStorageShortcut,
  displayContractFundFrom,
  genDecompileInEthervmBtn,
  genExportTableDataBtn,
  genApprovalDiagnosisBtn,
  genContractPrivateVariables,
  formatWriteContractParams,
  genProxyContractLog,
  genSimulateBtn,
  genContractVariableLogsBtn,
  genTransactionHashPhalconLink
} from '../feat-scripts'

const initAddressPageScript = async (chain: string) => {
  /** get user options */
  const {
    complianceScores,
    fundFlow,
    enhancedLabels,
    enhancedSignatures,
    contractSourcecode,
    quick2debank,
    decompileInDedaub,
    dedaubStorage,
    utc2locale,
    showCopyIcon,
    dethCode,
    addressFunderLabel,
    decompileInEthervm,
    exportTableData,
    approvalDiagnosis,
    privateVariables,
    formatContractParams,
    proxyLogs,
    txSimulator,
    variableLogs,
    quick2Parsers
  } = await store.get('options')

  if (enhancedSignatures) genEnhancedSignatures(chain)

  if (enhancedLabels) {
    genMainAddressLabel(chain)
    genEnhancedLabels(chain)
  }
  if (complianceScores) genComplianceScoresBtn(chain)
  if (fundFlow) genFundFlow(chain)
  if (contractSourcecode) genDownloadSourceCodeBtn(chain)
  if (dethCode) genQuickViewSourceCodeBtn(chain)
  if (quick2debank) genDeBankBtn(chain)
  if (decompileInDedaub) genDecompileInDedaubBtn(chain)
  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.ADDRESS.name)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.ADDRESS.name)
  if (addressFunderLabel) displayContractFundFrom(chain)
  if (decompileInEthervm) genDecompileInEthervmBtn(chain)
  if (exportTableData)
    genExportTableDataBtn(chain, ETHERSCAN_PAGES.ADDRESS.name)
  if (approvalDiagnosis) genApprovalDiagnosisBtn(chain)
  if (privateVariables) genContractPrivateVariables(chain)
  if (formatContractParams) formatWriteContractParams()
  if (proxyLogs) genProxyContractLog(chain)
  if (dedaubStorage) genDedaubStorageShortcut(chain)
  if (txSimulator && isSupportSimulator(chain)) genSimulateBtn(chain)
  if (variableLogs) genContractVariableLogsBtn(chain)
  if (quick2Parsers) genTransactionHashPhalconLink(ETHERSCAN_PAGES.ADDRESS.name)
}

export default initAddressPageScript
