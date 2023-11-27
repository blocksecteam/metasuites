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
  genNFTGoBtn,
  genDedaubStorageShortcut,
  displayContractFundFrom,
  genDecompileInEthervmBtn,
  genExportTableDataBtn,
  genApprovalDiagnosisBtn,
  genMainAddressFortaLabels,
  scanTxnFortaAlert,
  genContractPrivateVariables,
  formatWriteContractParams,
  genProxyContractLog,
  genSimulateBtn,
  genContractVariableLogsBtn
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
    quick2NFTGo,
    addressFunderLabel,
    decompileInEthervm,
    exportTableData,
    approvalDiagnosis,
    enhancedFortaLabels,
    txnFortaAlert,
    privateVariables,
    formatContractParams,
    proxyLogs,
    txSimulator,
    variableLogs
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
  if (quick2NFTGo) genNFTGoBtn()
  if (addressFunderLabel) displayContractFundFrom(chain)
  if (decompileInEthervm) genDecompileInEthervmBtn(chain)
  if (exportTableData)
    genExportTableDataBtn(chain, ETHERSCAN_PAGES.ADDRESS.name)
  if (approvalDiagnosis) genApprovalDiagnosisBtn(chain)
  if (enhancedFortaLabels) genMainAddressFortaLabels(chain)
  if (txnFortaAlert) scanTxnFortaAlert(chain, ETHERSCAN_PAGES.ADDRESS.name)
  if (privateVariables) genContractPrivateVariables(chain)
  if (formatContractParams) formatWriteContractParams()
  if (proxyLogs) genProxyContractLog(chain)
  if (dedaubStorage) genDedaubStorageShortcut(chain)
  if (txSimulator && isSupportSimulator(chain)) genSimulateBtn(chain)
  if (variableLogs) genContractVariableLogsBtn(chain)
}

export default initAddressPageScript
