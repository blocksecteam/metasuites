/** *scans address */
export const TABLE_LIST_ADDRESS_SELECTORS =
  "#maindiv tbody a.hash-tag[href*='0x'][data-original-title*='0x' i], #maindiv tbody span.hash-tag[data-original-title*='0x' i], .card tbody a.hash-tag[href*='/address/'][data-original-title*='0x' i], .card tbody span.hash-tag[data-original-title*='0x' i]"

/** *scans methods */
export const TABLE_LIST_METHOD_SELECTORS =
  '.card tbody .u-label.u-label--info, maindiv tbody .u-label.u-label--info'

/** etherscan address */
export const TABLE_LIST_ADDRESS_SELECTORS_V2 =
  ".card tbody *:has(+ a.js-clipboard[aria-label='Copy Address'])"

/** etherscan methods */
export const TABLE_LIST_METHOD_SELECTORS_V2 =
  '.table-responsive table tbody span.d-block.badge.text-truncate'

/** *scans address */
export const TR_CONTRACT_ADDRESS_SELECTORS =
  "#ContentPlaceHolder1_trContract a.hash-tag[href*='/address/']"

/** etherscan address */
export const TR_CONTRACT_ADDRESS_SELECTORS_V2 =
  "#ContentPlaceHolder1_trContract a[href*='/address/']"
