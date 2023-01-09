export const OPENSEA_PAGE_NAMES = ['COLLECTION', 'USER', 'ASSETS'] as const

interface OpenseaPage {
  pattern: RegExp
  name: typeof OPENSEA_PAGE_NAMES[number]
}

export const OPENSEA_PAGES: Record<
  typeof OPENSEA_PAGE_NAMES[number],
  OpenseaPage
> = {
  COLLECTION: {
    name: 'COLLECTION',
    pattern: /^(\/.+)?\/collection\/.+/
  },
  ASSETS: {
    name: 'ASSETS',
    pattern: /^(\/.+)?\/assets\/.+/
  },
  /** index must be last */
  USER: {
    name: 'USER',
    pattern: /^(\/.+)?\/.+/
  }
}

export const OPENSEA_SUPPORT_CHAINS: Record<'name' | 'chain', string>[] = [
  {
    name: 'ethereum',
    chain: 'eth'
  },
  {
    name: 'matic',
    chain: 'polygon'
  },
  {
    name: 'optimism',
    chain: 'optimism'
  },
  {
    name: 'arbitrum',
    chain: 'arbitrum'
  },
  {
    name: 'avalanche',
    chain: 'avalanche'
  },
  {
    name: 'bsc',
    chain: 'bsc'
  },
  {
    name: 'klaytn',
    chain: 'klaytn'
  }
]

export enum GraphqlEventIds {
  AssetSearchCollectionQuery = 'AssetSearchCollectionQuery',
  EventHistoryPaginationQuery = 'EventHistoryPaginationQuery',
  OrdersPaginationQuery = 'OrdersPaginationQuery'
}
