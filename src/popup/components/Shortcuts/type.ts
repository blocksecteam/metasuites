export type SearchResultType = 'Address' | 'Ens' | 'Selector' | 'Transaction'

export interface SearchResultItem {
  type: SearchResultType
  title: string
  link: string
}
