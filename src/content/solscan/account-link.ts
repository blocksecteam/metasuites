import { PATTERN_SOLANA_ADDRESS_EXAC } from '@common/constants/reg'

export const getSolscanAccountAddress = (
  href: string | null,
  pageUrl: string
): string | null => {
  if (!href) return null

  try {
    const page = new URL(pageUrl)
    const url = new URL(href, page)
    if (
      page.hostname !== 'solscan.io' ||
      !['https:', 'http:'].includes(page.protocol) ||
      url.origin !== page.origin ||
      url.username ||
      url.password
    ) {
      return null
    }

    const match = url.pathname.match(/^\/account\/([^/]+)\/?$/)
    return match && PATTERN_SOLANA_ADDRESS_EXAC.test(match[1]) ? match[1] : null
  } catch {
    return null
  }
}
