export const unique = <T extends Record<string, unknown>>(
  arr: T[],
  val: string
): T[] => {
  const res = new Map()
  return arr.filter(item => !res.has(item[val]) && res.set(item[val], 1))
}

export const swapItem = <T>(arr: T[], fromIndex: number, toIndex: number) => {
  arr[toIndex] = arr.splice(fromIndex, 1, arr[toIndex])[0]
  return arr
}
