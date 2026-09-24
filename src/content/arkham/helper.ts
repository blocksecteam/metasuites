import $ from 'jquery'

/**
 * Arkham styles its UI with Tailwind utilities plus hashed CSS-module names,
 * so class based anchors break on every redesign (see the 2025-11 fix). Prefer
 * semantic attributes such as `aria-label` or `data-*`, and keep older anchors
 * at the end of each list so a partial rollout degrades instead of breaking.
 */
export const ARKHAM_SELECTORS = {
  /** Transaction page: the icon linking out to the native block explorer */
  txExternalLink: [
    'a[aria-label*="external explorer"]',
    'a[title*="external explorer"]',
    'a[class*="__externalLink"]'
  ],
  /** Address page: the block showing the address display name */
  addressTitle: [
    'div[class*="EditableTitle-module"]',
    'a[data-identity-hover-key]',
    'div[class*="__displayNameAddress"]'
  ]
}

/** Selector list as a single CSS query, for "wait until any of them shows up" */
export const anyOf = (selectors: string[]) => selectors.join(', ')

/** First non-empty match, honouring the order the selectors are listed in */
export const findFirst = (selectors: string[]): JQuery<HTMLElement> => {
  for (const selector of selectors) {
    const matched = $(selector)
    if (matched.length) return matched.first()
  }
  return $()
}

export const lazyLoad = (
  callback: () => void,
  inspector: string,
  maxRetries = 60
) => {
  const loading = !$(inspector).length
  if (loading) {
    if (maxRetries > 0) {
      setTimeout(() => {
        lazyLoad(callback, inspector, maxRetries - 1)
      }, 500)
    } else {
      console.log('Maximum retries reached, giving up.')
    }
  } else {
    requestIdleCallback(callback)
  }
}
