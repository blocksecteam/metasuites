import {
  PATTERN_EVM_ADDRESS_EXAC,
  PATTERN_BTC_ADDRESS_LOOSE,
  PATTERN_SELECTOR_EXACT,
  PATTERN_EVM_ADDRESS_LOOSE,
  PATTERN_BTC_ADDRESS_EXAC,
  PATTERN_EVM_TX_HASH,
  PATTERN_BTC_TX_HASH,
  PATTERN_ENS,
  PATTERN_SELECTOR_LOOSE
} from '@common/constants'

export const isAddress = (str: string): boolean => {
  return (
    PATTERN_EVM_ADDRESS_EXAC.test(str) || PATTERN_BTC_ADDRESS_EXAC.test(str)
  )
}

export const isEvmAddress = (str: string): boolean => {
  return PATTERN_EVM_ADDRESS_EXAC.test(str)
}

export const isTransaction = (str: string): boolean => {
  return PATTERN_EVM_TX_HASH.test(str) || PATTERN_BTC_TX_HASH.test(str)
}

export const isMethod = (str: string, isExact = true): boolean => {
  return isExact
    ? PATTERN_SELECTOR_EXACT.test(str)
    : PATTERN_SELECTOR_LOOSE.test(str)
}

export const pickAddress = (str: string): string | undefined => {
  return (
    str.match(PATTERN_EVM_ADDRESS_LOOSE)?.[0] ||
    str.match(PATTERN_BTC_ADDRESS_LOOSE)?.[0]
  )
}

export const isENS = (str: string) => {
  return PATTERN_ENS.test(str)
}
