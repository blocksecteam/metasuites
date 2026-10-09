import allowlist from '@common/config/allowlist'

const returnHosts = [
  ...allowlist.ETHERSCAN_V2_MATCHES,
  ...allowlist.TRONSCAN_MATCHES,
  ...allowlist.SOLSCAN_MATCHES,
  ...allowlist.SOLANA_EXPLORER_MATCHES
].map(pattern => pattern.split('://')[1].split('/')[0])

export const isMessageObject = (
  value: unknown
): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export const getReturnUrl = (value: unknown): string | null => {
  if (typeof value !== 'string' || !value.trim()) return null

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.port) {
      return null
    }

    // Match parsed hostnames, not raw URLs containing query/fragment text.
    const allowed = returnHosts.some(host => {
      if (!host.startsWith('*.')) return url.hostname === host
      const domain = host.slice(2)
      return url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    })
    return allowed ? url.href : null
  } catch {
    return null
  }
}

export const parseToken = (raw: string | null): string | null => {
  if (!raw) return null

  let token: unknown
  try {
    token = JSON.parse(raw)
  } catch {
    // Keep compatibility with legacy tokens stored without JSON encoding.
    token = raw
  }
  return typeof token === 'string' && token.trim() ? token : null
}
