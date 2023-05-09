export const SCAN_PAGE_NAMES = [
  'TXS',
  'BLOCK',
  'ADDRESS',
  'TX',
  'BLOCKS',
  'ACCOUNTS',
  'TOKEN',
  'TOKENTXNS',
  'TOKEN_APPROVAL_CHECKER',
  'TXS_INTERNAL',
  'NFT_TRANSFERS',
  'BLOCKS_FORKED'
] as const

interface ScanPage {
  pattern: RegExp
  name: (typeof SCAN_PAGE_NAMES)[number]
}

export const SCAN_PAGES: Record<(typeof SCAN_PAGE_NAMES)[number], ScanPage> = {
  TXS_INTERNAL: {
    name: 'TXS_INTERNAL',
    pattern: /^\/txsInternal.?/
  },
  TXS: {
    name: 'TXS',
    pattern: /^\/txs.?/
  },
  BLOCK: {
    name: 'BLOCK',
    pattern: /^\/block\/.+/
  },
  BLOCKS_FORKED: {
    name: 'BLOCKS_FORKED',
    pattern: /^\/blocks_forked/
  },
  BLOCKS: {
    name: 'BLOCKS',
    pattern: /^\/blocks.?/
  },
  ADDRESS: {
    name: 'ADDRESS',
    pattern: /^\/address\/.+/
  },
  TX: {
    name: 'TX',
    pattern: /^\/tx\/.+/
  },
  ACCOUNTS: {
    name: 'ACCOUNTS',
    pattern: /^\/accounts.?/
  },
  TOKENTXNS: {
    name: 'TOKENTXNS',
    pattern: /^\/tokentxns.?/
  },
  TOKEN: {
    name: 'TOKEN',
    pattern: /^\/token\/.+/
  },
  TOKEN_APPROVAL_CHECKER: {
    name: 'TOKEN_APPROVAL_CHECKER',
    pattern: /^\/tokenapprovalchecker.?/
  },
  NFT_TRANSFERS: {
    name: 'NFT_TRANSFERS',
    pattern: /^\/nft-transfers.?/
  }
}
