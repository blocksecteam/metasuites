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
  pathname: string
  name: typeof SCAN_PAGE_NAMES[number]
}

export const SCAN_PAGES: Record<typeof SCAN_PAGE_NAMES[number], ScanPage> = {
  TXS: {
    pathname: '/txs',
    name: 'TXS'
  },
  BLOCK: {
    pathname: '/block/',
    name: 'BLOCK'
  },
  BLOCKS: {
    pathname: '/blocks',
    name: 'BLOCKS'
  },
  ADDRESS: {
    pathname: '/address/',
    name: 'ADDRESS'
  },
  TX: {
    pathname: '/tx',
    name: 'TX'
  },
  ACCOUNTS: {
    pathname: '/accounts',
    name: 'ACCOUNTS'
  },
  TOKEN: {
    pathname: '/token/',
    name: 'TOKEN'
  },
  TOKENTXNS: {
    pathname: '/tokentxns',
    name: 'TOKENTXNS'
  }
}
