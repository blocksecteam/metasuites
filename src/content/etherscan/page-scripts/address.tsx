import { store } from '@src/store'
import { ETHERSCAN_PAGES } from '@common/constants'

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
  genDedaubStorageShortcut,
  convertUTC2locale,
  displayContractFundFrom,
  genDecompileInEthervmBtn,
  genCopyIconBtn,
  genApprovalDiagnosisBtn,
  genContractPrivateVariables,
  genTokenMarketplacesBtn,
  formatWriteContractParams,
  genProxyContractLog,
  genSimulateBtn,
  genContractVariableLogsBtn,
  genTransactionHashPhalconLink,
  hideZeroValueTransfers
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
    dethCode,
    addressFunderLabel,
    decompileInEthervm,
    showCopyIcon,
    approvalDiagnosis,
    privateVariables,
    formatContractParams,
    tokenMarketplaces,
    proxyLogs,
    txSimulator,
    variableLogs,
    quick2Parsers,
    hideZeroValueTransfers: hideZeroValueEnabled
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
  if (addressFunderLabel) displayContractFundFrom(chain)
  if (decompileInEthervm) genDecompileInEthervmBtn(chain)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.ADDRESS.name)
  if (approvalDiagnosis) genApprovalDiagnosisBtn(chain)
  if (privateVariables) genContractPrivateVariables(chain)
  if (formatContractParams) formatWriteContractParams()
  if (tokenMarketplaces)
    genTokenMarketplacesBtn(chain, ETHERSCAN_PAGES.ADDRESS.name)
  if (proxyLogs) genProxyContractLog(chain)
  if (dedaubStorage) genDedaubStorageShortcut(chain)
  if (txSimulator) genSimulateBtn(chain)
  if (variableLogs) genContractVariableLogsBtn(chain)
  if (quick2Parsers) genTransactionHashPhalconLink(ETHERSCAN_PAGES.ADDRESS.name)
  if (hideZeroValueEnabled) hideZeroValueTransfers(ETHERSCAN_PAGES.ADDRESS.name)
}

export default initAddressPageScript
