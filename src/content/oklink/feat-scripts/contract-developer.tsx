import { store } from '@src/store'

import genProxyContractLog from './proxy-contract-log'
import genDedaubStorageShortcut from './dedaub-storage'
import genEvmStorageShortcut from './evm-storage'
import genContractVariableLogsBtn from './contract-variable-logs'
import genContractPrivateVariables from './contract-private-variables'
import genDownloadSourceCodeBtn from './downlaod-contract-source-code'
import genDecompileInDedaubBtn from './decompile-in-dedaub'
import genDecompileInEthervmBtn from './decompile-in-ethervm'

const getContractDeveloper = async (address: string) => {
  if (!address) return
  const {
    dedaubStorage,
    evmStorage,
    proxyLogs,
    variableLogs,
    privateVariables,
    contractSourcecode,
    decompileInDedaub,
    decompileInEthervm
  } = await store.get('options')

  if (proxyLogs) genProxyContractLog(address)
  if (dedaubStorage) genDedaubStorageShortcut(address)
  if (evmStorage) genEvmStorageShortcut(address)
  if (variableLogs) genContractVariableLogsBtn(address)
  if (privateVariables) genContractPrivateVariables(address)
  if (contractSourcecode) genDownloadSourceCodeBtn(address)
  if (decompileInDedaub) genDecompileInDedaubBtn(address)
  if (decompileInEthervm) genDecompileInEthervmBtn(address)
}

export default getContractDeveloper
