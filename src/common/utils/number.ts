export const numFormatter = (numStr: string): string => {
  return numStr.toString().replace(/\d+/, n => {
    return n.replace(/(\d)(?=(\d{3})+$)/g, $1 => {
      return $1 + ','
    })
  })
}
