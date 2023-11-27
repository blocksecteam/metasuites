/** time format check YYYY-MM-DD HH:mm:ss */
export const DATE_STANDARD_FORMAT_REG =
  /^(\d{4})(-|\/)(\d{2})\2(\d{2}) (\d{1,2}):(\d{2}):(\d{2})$/

/** address regHex */
export const PATTERN_EVM_ADDRESS_EXAC = /^0[x|X][A-Fa-f0-9]{40}$/

export const PATTERN_EVM_ADDRESS_LOOSE = /0[x|X][A-Fa-f0-9]{40}/

export const PATTERN_EVM_TX_HASH = /0[x|X][A-Fa-f0-9]{64}/g

export const PATTERN_BTC_TX_HASH = /[A-Fa-f0-9]{64}/g

export const PATTERN_SELECTOR_EXACT = /^0[x|X][A-Fa-f0-9]{8}$/

export const PATTERN_SELECTOR_LOOSE = /^(0[x|X])?[A-Fa-f0-9]{8}$/

export const PATTERN_BTC_ADDRESS_LOOSE =
  /\b(?:[13][1-9A-HJ-NP-Za-km-z]{25,34})|(?:bc1(?:(?:(?:q[ac-hj-np-z02-9]{38}(?:[ac-hj-np-z02-9]{20})?)|(?:p[ac-hj-np-z02-9]{58}))))\b/

export const PATTERN_BTC_ADDRESS_EXAC =
  /^\b(?:[13][1-9A-HJ-NP-Za-km-z]{25,34})|(?:bc1(?:(?:(?:q[ac-hj-np-z02-9]{38}(?:[ac-hj-np-z02-9]{20})?)|(?:p[ac-hj-np-z02-9]{58}))))\b$/

export const PATTERN_ENS = /\.(eth)$/

export const PATTERN_INPUT_DATA = /^0[x|X][A-Fa-f0-9]*$/

export const PATTERN_TRX_ADDRESS_EXAC = /^T[a-zA-Z0-9]{33}$/

export const PATTERN_TRX_ADDRESS_LOOSE = /T[a-zA-Z0-9]{33}/

export const PATTERN_TRX_TX_HASH = /[a-fA-F0-9]{64}/g
