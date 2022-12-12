/** check whether the domain is same origin */
export const validOrigin = (str: string): boolean => {
  try {
    const url = new URL(str)
    return url.host === window.location.host
  } catch (e) {
    return false
  }
}
