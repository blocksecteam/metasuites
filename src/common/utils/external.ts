import {
  PATTERN_EVM_ADDRESS_EXAC,
  PATTERN_BTC_ADDRESS_EXAC,
  PATTERN_EVM_TX_HASH,
  PATTERN_BTC_TX_HASH
} from '@common/constants'

export const getExternalAddressUrl = (address: string) => {
  if (PATTERN_EVM_ADDRESS_EXAC.test(address)) {
    return `https://blockscan.com/address/${address}`
  }
  if (PATTERN_BTC_ADDRESS_EXAC.test(address)) {
    return `https://explorer.btc.com/btc/search/${address}`
  }
  return
}

export const getExternalTxUrl = (tx: string) => {
  if (PATTERN_EVM_TX_HASH.test(tx)) {
    return `https://blockscan.com/tx/${tx}`
  }
  if (PATTERN_BTC_TX_HASH.test(tx)) {
    return `https://explorer.btc.com/btc/transaction/${tx}`
  }
  return
}

export const getExternalSignatureUrl = (signature: string) => {
  const s = signature.toLowerCase().startsWith('0x')
    ? signature
    : `0x${signature}`
  return `https://www.4byte.directory/signatures/?bytes4_signature=${s}`
}
