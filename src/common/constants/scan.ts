export const ETHERSCAN_PAGE_NAMES = [
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

export const TRONSCAN_PAGE_NAMES = [
  'BLOCK',
  'ADDRESS',
  'TX',
  'TOKEN',
  'CONTRACT',
  'ADVANCED_FILTER'
] as const

export const ETHERSCAN_PAGES: Record<
  (typeof ETHERSCAN_PAGE_NAMES)[number],
  {
    pattern: RegExp
    name: (typeof ETHERSCAN_PAGE_NAMES)[number]
  }
> = {
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

export const TRONSCAN_PAGES: Record<
  (typeof TRONSCAN_PAGE_NAMES)[number],
  {
    pattern: RegExp
    name: (typeof TRONSCAN_PAGE_NAMES)[number]
  }
> = {
  ADDRESS: {
    name: 'ADDRESS',
    pattern: /^\/address\/.+/
  },
  TX: {
    name: 'TX',
    pattern: /^\/transaction\/.+/
  },
  CONTRACT: {
    name: 'CONTRACT',
    pattern: /^\/contract\/.+/
  },
  BLOCK: {
    name: 'BLOCK',
    pattern: /^\/block\/.+/
  },
  TOKEN: {
    name: 'TOKEN',
    /**
     *  token20: 'https://tronscan.org/#/token20',
     *  token10: 'https://tronscan.org/#/token/$token10/transfers',
     */
    pattern: /^\/token20\/|\/token\//
  },
  ADVANCED_FILTER: {
    name: 'ADVANCED_FILTER',
    pattern: /\/tools\/advanced-filter(\?[\w%=&]*)?/
  }
}
