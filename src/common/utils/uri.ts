/** check whether the domain is same origin */
export const validOrigin = (str: string): boolean => {
  try {
    const url = new URL(str)
    return url.host === window.location.host
  } catch (e) {
    return false
  }
}

export const getHrefQueryVariable = (
  href: string,
  variable: string
): string | null => {
  const query = href.split('?')?.[1]
  if (!query) return null
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return null
}
