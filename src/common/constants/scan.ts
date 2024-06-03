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

export const BLOCKSCOUT_PAGE_NAMES = ['TX', 'ADDRESS'] as const
export const MERLINSCAN_PAGE_NAMES = ['TX'] as const
export const SOLSCAN_PAGE_NAMES = ['ACCOUNT', 'TX', 'TOKEN'] as const
export const SOLANAFM_PAGE_NAMES = ['ADDRESS', 'TX'] as const
export const SOLANAEXPL_PAGE_NAMES = ['ADDRESS', 'TX'] as const
export const ARKHAM_PAGE_NAMES = ['ADDRESS', 'TX'] as const

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

export type BlockscoutPageName = (typeof BLOCKSCOUT_PAGE_NAMES)[number]
export const BLOCKSCOUT_ROUTER_EVENTS = ['PATHNAME_CHANGED', 'TAB_CHANGED']
export type BlockscoutRouterEvent = (typeof BLOCKSCOUT_ROUTER_EVENTS)[number]

export const BLOCKSCOUT_PAGES: Record<
  (typeof BLOCKSCOUT_PAGE_NAMES)[number],
  {
    pattern: RegExp
    name: BlockscoutPageName
    routerEvents: Array<BlockscoutRouterEvent>
  }
> = {
  TX: {
    name: 'TX',
    pattern: /^\/tx\/(0x[a-fA-F\d]{64})/i,
    routerEvents: ['PATHNAME_CHANGED', 'TAB_CHANGED']
  },
  ADDRESS: {
    name: 'ADDRESS',
    pattern: /^\/address\/(0x[a-fA-F\d]{40})/i,
    routerEvents: ['PATHNAME_CHANGED']
  }
}

export const MERLINSCAN_PAGES: Record<
  (typeof MERLINSCAN_PAGE_NAMES)[number],
  {
    pattern: RegExp
    name: (typeof MERLINSCAN_PAGE_NAMES)[number]
  }
> = {
  TX: {
    name: 'TX',
    pattern: /^\/tx\/(0x[a-fA-F\d]{64})/i
  }
}

export const SOLSCAN_PAGES: Record<
  (typeof SOLSCAN_PAGE_NAMES)[number],
  {
    pattern: RegExp
    name: (typeof SOLSCAN_PAGE_NAMES)[number]
  }
> = {
  ACCOUNT: {
    name: 'ACCOUNT',
    pattern: /^\/account\/([1-9A-HJ-NP-Za-km-z]{32,44})/i
  },
  TOKEN: {
    name: 'TOKEN',
    pattern: /^\/token\/([1-9A-HJ-NP-Za-km-z]{32,44})/i
  },
  TX: {
    name: 'TX',
    pattern: /^\/tx\/([1-9A-Za-z]+)/i
  }
}

export const SOLANAFM_PAGES: Record<
  (typeof SOLANAFM_PAGE_NAMES)[number],
  {
    pattern: RegExp
    name: (typeof SOLANAFM_PAGE_NAMES)[number]
  }
> = {
  ADDRESS: {
    name: 'ADDRESS',
    pattern: /^\/address\/([1-9A-HJ-NP-Za-km-z]{32,44})/i
  },
  TX: {
    name: 'TX',
    pattern: /^\/tx\/([1-9A-Za-z]+)/i
  }
}

export const SOLANAEXPL_PAGES: Record<
  (typeof SOLANAEXPL_PAGE_NAMES)[number],
  {
    pattern: RegExp
    name: (typeof SOLANAEXPL_PAGE_NAMES)[number]
  }
> = {
  ADDRESS: {
    name: 'ADDRESS',
    pattern: /^\/address\/([1-9A-HJ-NP-Za-km-z]{32,44})/i
  },
  TX: {
    name: 'TX',
    pattern: /^\/tx\/([1-9A-Za-z]+)/i
  }
}

export const ARKHAM_PAGES: Record<
  (typeof ARKHAM_PAGE_NAMES)[number],
  {
    pattern: RegExp
    name: (typeof ARKHAM_PAGE_NAMES)[number]
  }
> = {
  ADDRESS: {
    name: 'ADDRESS',
    pattern: /^\/explorer\/address\/(0x[a-fA-F\d]{40})/i
  },
  TX: {
    name: 'TX',
    pattern: /^\/explorer\/tx\/.+/i
  }
}
