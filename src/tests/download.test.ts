import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { json2csv } from 'json-2-csv'
import { parse } from 'papaparse'

import { convertToCSV, downloadCsv } from '@common/utils/download'

let createObjectURL: ReturnType<typeof vi.fn>
let link: { href: string; download: string; click: ReturnType<typeof vi.fn> }

beforeEach(() => {
  createObjectURL = vi.fn(() => 'blob:csv-test')
  link = { href: '', download: '', click: vi.fn() }
  vi.stubGlobal('window', { URL: { createObjectURL } })
  vi.stubGlobal('document', { createElementNS: vi.fn(() => link) })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function rows(csv: string, newline: '\r\n' | '\n') {
  const result = parse<string[]>(csv, { delimiter: ',', newline })
  expect(result.errors).toEqual([])
  return result.data
}

async function exported(input: string[][] | object[]) {
  await downloadCsv('csv-test', input)
  expect(createObjectURL).toHaveBeenCalledTimes(1)
  expect(link.href).toBe('blob:csv-test')
  expect(link.download).toBe('csv-test.csv')
  expect(link.click).toHaveBeenCalledTimes(1)
  const blob = createObjectURL.mock.calls[0][0] as Blob
  // Blob.text() strips a leading BOM; inspect the bytes before decoding.
  const bytes = new Uint8Array(await blob.arrayBuffer())
  return {
    bytes,
    text: new TextDecoder('utf-8', { ignoreBOM: true }).decode(bytes)
  }
}

const dangerousCells = [
  '=1+1',
  '+1+1',
  '-1+1',
  '@SUM(1,1)',
  '-123.45',
  ' =1+1',
  '\t=1+1',
  '\r=1+1',
  '\n=1+1',
  ' \t\n@SUM(1,1)',
  ' =1+1',
  '﻿=1+1',
  '\tplain',
  '\rplain',
  '\nplain',
  '\u0000plain',
  '\u001fplain',
  '\u007fplain',
  '=1+1\nsecond line'
]

test.each(dangerousCells)(
  'neutralizes dangerous table cell and header: %j',
  value => {
    const csv = convertToCSV([
      [value, 'header'],
      [value, 'normal']
    ])
    expect(rows(csv, '\r\n')).toEqual([
      [`'${value}`, 'header'],
      [`'${value}`, 'normal'],
      ['']
    ])
  }
)

test.each(dangerousCells)(
  'neutralizes object field value through download: %j',
  value => {
    return exported([{ address: '0x1234', label: value }]).then(({ text }) => {
      expect(rows(text, '\n')).toEqual([
        ['address', 'label'],
        ['0x1234', `'${value}`]
      ])
    })
  }
)

test('escapes quotes, delimiters and newlines without cell or row breakout', () => {
  const input = [
    ['label', 'description'],
    ['safe",=1+1,"tail', '中文,"引号"'],
    ['first\nsecond', 'first\r\nsecond'],
    ['comma,value', 'two"quotes"'],
    ['', 'trailing spaces  ']
  ]
  expect(rows(convertToCSV(input), '\r\n')).toEqual([...input, ['']])
})

test('preserves normal table text and the existing CRLF / no-BOM format', async () => {
  const input = [
    ['Address', 'Label', 'Amount'],
    ['0x1234', '中文标签', '123.45'],
    ['test', "already 'quoted'", ''],
    ['test', "'=1+1", '']
  ]
  const { text, bytes } = await exported(input)
  expect(rows(text, '\r\n')).toEqual([...input, ['']])
  expect(text.endsWith('\r\n')).toBe(true)
  expect(Array.from(bytes.slice(0, 3))).not.toEqual([0xef, 0xbb, 0xbf])
})

test('preserves nested object / array field expansion and normal values', async () => {
  const input = [
    {
      id: 1,
      blockNumber: 123,
      value: [{ type: 'uint256', value: '-1', deep: false }],
      metadata: { label: '中文标签', address: '0x1234' },
      empty: '',
      enabled: true
    },
    {
      id: 2,
      blockNumber: 124,
      value: [{ type: 'uint256', value: '2', deep: true }],
      metadata: { label: '包含,逗号和"引号"\n换行', address: '0x5678' },
      empty: null,
      enabled: false
    }
  ]
  const before = JSON.stringify(input)
  const expected = rows(json2csv(input), '\n')
  const { text, bytes } = await exported(input)
  expect(rows(text, '\n')).toEqual(expected)
  expect(Array.from(bytes.slice(0, 3))).toEqual([0xef, 0xbb, 0xbf])
  expect(text.startsWith('﻿')).toBe(true)
  expect(JSON.stringify(input)).toBe(before)
})

test('neutralizes object headers as well as expanded fields', async () => {
  const { text } = await exported([
    { '=1+1': '=2+2', safe: { label: '@SUM(1,1)' } }
  ])
  expect(rows(text, '\n')).toEqual([
    ["'=1+1", 'safe.label'],
    ["'=2+2", "'@SUM(1,1)"]
  ])
})

test('preserves leading BOM content in the first object header', async () => {
  const header = '﻿=1+1'
  const { text } = await exported([{ [header]: 'x' }])
  expect(rows(text, '\n')).toEqual([[`'${header}`], ['x']])
})

test('object field cannot break out into extra cells', async () => {
  const label = 'safe",=1+1,"tail\nnext row'
  const { text } = await exported([{ address: 'test', label }])
  expect(rows(text, '\n')).toEqual([
    ['address', 'label'],
    ['test', label]
  ])
})

test('protects every row in mixed data without modifying input', () => {
  const input = [['header'], ['=1+1'], ["'=1+1"], ['normal'], ['@SUM(1,1)']]
  const before = JSON.stringify(input)
  expect(rows(convertToCSV(input), '\r\n')).toEqual([
    ['header'],
    ["'=1+1"],
    ["'=1+1"],
    ['normal'],
    ["'@SUM(1,1)"],
    ['']
  ])
  expect(JSON.stringify(input)).toBe(before)
})

test('handles empty table input', () => {
  expect(convertToCSV([])).toBe('')
})

test('empty download retains the object branch BOM and blank records', async () => {
  const { text, bytes } = await exported([])
  expect(Array.from(bytes.slice(0, 3))).toEqual([0xef, 0xbb, 0xbf])
  expect(rows(text, '\n')).toEqual(rows(json2csv([]), '\n'))
})

test('preserves final empty object values rather than skipping rows', async () => {
  const input = [{ label: 'first' }, { label: '' }]
  const { text } = await exported(input)
  expect(rows(text, '\n')).toEqual([['label'], ['first'], ['']])
})
