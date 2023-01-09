export const SCAN_PAGE_NAMES = [
  'TXS',
  'BLOCK',
  'ADDRESS',
  'TX',
  'BLOCKS',
  'ACCOUNTS',
  'TOKEN',
  'TOKENTXNS'
] as const

interface ScanPage {
  pattern: RegExp
  name: typeof SCAN_PAGE_NAMES[number]
}

export const SCAN_PAGES: Record<typeof SCAN_PAGE_NAMES[number], ScanPage> = {
  TXS: {
    name: 'TXS',
    pattern: /^\/txs.?/
  },
  BLOCK: {
    name: 'BLOCK',
    pattern: /^\/block\/.+/
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
  TOKEN: {
    name: 'TOKEN',
    pattern: /^\/token\/.+/
  },
  TOKENTXNS: {
    name: 'TOKENTXNS',
    pattern: /^\/tokentxns.?/
  }
}
