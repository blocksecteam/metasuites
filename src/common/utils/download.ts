import { json2csv } from 'json-2-csv'

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

export const downloadCsv = async (
  fileName: string,
  json: string[][] | object[]
) => {
  // The data for the 'export current data' feature is scraped from the webpage and is in the form of a two-dimensional array.
  const isTwoDimensionalArray = json.length > 0 && Array.isArray(json[0])
  const jsonStr = isTwoDimensionalArray
    ? convertToCSV(json as string[][])
    : await json2csv(json)
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
