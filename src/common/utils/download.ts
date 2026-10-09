import { json2csv } from 'json-2-csv'
import { parse, unparse } from 'papaparse'

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

const serializeCsv = (rows: string[][], newline: string) => {
  return unparse(rows, {
    quotes: true,
    newline,
    // Treat formula prefixes (including after whitespace) and leading controls as text.
    // eslint-disable-next-line no-control-regex -- Deliberately detect control-prefixed cells.
    escapeFormulae: /^[\u0000-\u001f\u007f]|^\s*[=+\-@]/
  })
}

export const convertToCSV = (array: string[][]) => {
  return array.length ? serializeCsv(array, '\r\n') + '\r\n' : ''
}

export const downloadCsv = async (
  fileName: string,
  json: string[][] | object[]
) => {
  // The data for the 'export current data' feature is scraped from the webpage and is in the form of a two-dimensional array.
  const isTwoDimensionalArray = json.length > 0 && Array.isArray(json[0])
  let jsonStr: string
  if (isTwoDimensionalArray) {
    jsonStr = convertToCSV(json as string[][])
  } else {
    // Preserve json2csv's field expansion, then escape every cell, including headers.
    // PapaParse strips one leading BOM; add the file BOM so field content survives.
    const csv = json2csv(json, { excelBOM: true })
    const parsed = parse<string[]>(csv, { delimiter: ',', newline: '\n' })
    if (parsed.errors.length) throw new Error('Unable to serialize CSV safely')
    jsonStr = '﻿' + serializeCsv(parsed.data, '\n')
  }
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
