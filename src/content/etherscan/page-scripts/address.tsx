import { store } from '@src/store'
import { SCAN_PAGES } from '@common/constants'

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
  genNFTGoBtn,
  displayContractFundFrom,
  genDecompileInEthervmBtn,
  genExportTableDataBtn,
  genCopyIconBtn,
  genApprovalDiagnosisBtn,
  genMainAddressFortaLabels,
  scanTxnFortaAlert,
  genContractPrivateVariables,
  genTokenMarketplacesBtn,
  formatWriteContractParams,
  genProxyContractLog
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
    utc2locale,
    dethCode,
    quick2NFTGo,
    addressFunderLabel,
    decompileInEthervm,
    exportTableData,
    showCopyIcon,
    approvalDiagnosis,
    enhancedFortaLabels,
    txnFortaAlert,
    privateVariables,
    formatContractParams,
    tokenMarketplaces,
    proxyLog
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
  if (quick2debank) genDeBankBtn()
  if (decompileInDedaub) genDecompileInDedaubBtn(chain)
  if (utc2locale) convertUTC2locale(SCAN_PAGES.ADDRESS.name)
  if (quick2NFTGo) genNFTGoBtn()
  if (addressFunderLabel) displayContractFundFrom(chain)
  if (decompileInEthervm) genDecompileInEthervmBtn(chain)
  if (exportTableData) genExportTableDataBtn(chain, SCAN_PAGES.ADDRESS.name)
  if (showCopyIcon) genCopyIconBtn(SCAN_PAGES.ADDRESS.name)
  if (approvalDiagnosis) genApprovalDiagnosisBtn()
  if (enhancedFortaLabels) genMainAddressFortaLabels(chain)
  if (txnFortaAlert) scanTxnFortaAlert(chain)
  if (privateVariables) genContractPrivateVariables(chain)
  if (formatContractParams) formatWriteContractParams()
  if (tokenMarketplaces) genTokenMarketplacesBtn(chain, SCAN_PAGES.ADDRESS.name)
  if (proxyLog) genProxyContractLog(chain)
}

export default initAddressPageScript
