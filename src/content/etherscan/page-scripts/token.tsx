import { ETHERSCAN_PAGES } from '@common/constants'
import { store } from '@src/store'
import { ChainFeature } from '@common/config/chain-feature'

import {
  genEnhancedLabels,
  convertUTC2locale,
  genEnhancedSignatures,
  genDownloadSourceCodeBtn,
  genQuickViewSourceCodeBtn,
  genCopyIconBtn,
  genContractPrivateVariables,
  formatWriteContractParams,
  genTokenMarketplacesBtn,
  genProxyContractLog,
  genSimulateBtn,
  genContractVariableLogsBtn,
  genDedaubStorageShortcut,
  genTransactionHashPhalconLink
} from '../feat-scripts'

const initTokenPageScript = async (chain: string) => {
  const {
    enhancedLabels,
    utc2locale,
    enhancedSignatures,
    contractSourcecode,
    dethCode,
    showCopyIcon,
    privateVariables,
    formatContractParams,
    tokenMarketplaces,
    proxyLogs,
    txSimulator,
    variableLogs,
    dedaubStorage,
    quick2Parsers
  } = await store.get('options')

  if (enhancedLabels) genEnhancedLabels(chain)
  if (utc2locale) convertUTC2locale(ETHERSCAN_PAGES.TOKEN.name)
  if (enhancedSignatures) genEnhancedSignatures(chain)
  if (contractSourcecode) genDownloadSourceCodeBtn(chain)
  if (dethCode) genQuickViewSourceCodeBtn(chain)
  if (showCopyIcon) genCopyIconBtn(ETHERSCAN_PAGES.TOKEN.name)
  if (privateVariables) genContractPrivateVariables(chain)
  if (formatContractParams) formatWriteContractParams()
  if (tokenMarketplaces)
    genTokenMarketplacesBtn(chain, ETHERSCAN_PAGES.TOKEN.name)
  if (proxyLogs) genProxyContractLog(chain)
  if (dedaubStorage) genDedaubStorageShortcut(chain)
  if (txSimulator && ChainFeature.supports('txSimulator', chain))
    genSimulateBtn(chain)
  if (variableLogs) genContractVariableLogsBtn(chain)
  if (quick2Parsers) genTransactionHashPhalconLink(ETHERSCAN_PAGES.TOKEN.name)
}

export default initTokenPageScript
