export const downloadJson = (fileName: string, json: object) => {
  const jsonStr = JSON.stringify(json, null, 4)

  const url = window.URL || window.webkitURL || window
  const blob = new Blob([jsonStr])
  const saveLink = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'a'
  ) as HTMLAnchorElement
  saveLink.href = url.createObjectURL(blob)
  saveLink.download = `${fileName}.json`
  saveLink.click()
}

export const convertToCSV = (array: string[][]) => {
  let str = ''
  for (let i = 0; i < array.length; i++) {
    let line = ''
    for (const index in array[i]) {
      if (line != '') line += ','
      line += `"${array[i][index]}"`
    }
    str += line + '\r\n'
  }
  return str
}
export const downloadCsv = (fileName: string, json: string[][]) => {
  const jsonStr = convertToCSV(json)
  const url = window.URL || window.webkitURL || window
  const blob = new Blob([jsonStr])
  const saveLink = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'a'
  ) as HTMLAnchorElement
  saveLink.href = url.createObjectURL(blob)
  saveLink.download = `${fileName}.csv`
  saveLink.click()
}
