import { uniq } from 'lodash-es'
import URLMatchPattern from '@remusao/url-match-patterns'

import type { OptWebsite } from '@src/store'

export const isMatchURL = (url: string, patternList: string[]) => {
  let normalizedUrl: string
  try {
    normalizedUrl = new URL(url).href
  } catch {
    return false
  }

  return patternList.some(pattern => {
    return URLMatchPattern(pattern, normalizedUrl)
  })
}

/** judge from supportWebList */
export const isAllowed = (supportWebList: OptWebsite[]): boolean => {
  return supportWebList
    .filter(item => item.enabled)
    .map(item => ({
      ...item,
      domains: uniq([
        ...item.domains,
        ...(item.testNets?.map(i => i.domains) ?? []).flat()
      ])
    }))
    .map(item => item.domains)
    .flat()
    .some(item => window.location.host === item)
}
