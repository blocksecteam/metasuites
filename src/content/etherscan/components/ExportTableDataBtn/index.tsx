import React, { type FC } from 'react'

import { Dropdown, IconDownload } from '@common/components'
import type { DropdownMenus } from '@common/components/Dropdown'
import {
  isAddress,
  pickAddress,
  getHrefQueryVariable,
  downloadJson,
  downloadCsv
} from '@common/utils'
import { chromeEvent } from '@common/event'
import { GET_ADDRESS_LABELS } from '@common/constants'
import type { AddressLabel } from '@common/api/types'

interface Props {
  chain: string
  table: HTMLElement
}

const ExportTableDataBtn: FC<Props> = ({ chain, table }) => {
  const menus: DropdownMenus = [
    {
      key: 'csv',
      label: 'csv'
    },
    {
      key: 'json',
      label: 'json'
    }
  ]
  const onClick = async (key: string) => {
    const tableHeadEls = table.querySelectorAll<HTMLElement>(
      "thead tr th:not([class='d-none'])"
    )
    let headTitles = Array.from(tableHeadEls).map(th => {
      const thClone = th.cloneNode(true) as HTMLElement
      thClone?.querySelector('.dropdown')?.remove()
      return th.innerText.trim()
    })
    const fromIdx = headTitles.findIndex(text => text === 'From')
    const toIdx = headTitles.findIndex(text => text === 'To')
    const tokenIdx = headTitles.findIndex(text => text === 'Token')
    const filterIdxList: number[] = [
      headTitles.findIndex(text => text === 'Details')
    ]
    const containsFrom = fromIdx !== -1
    const containsTo = toIdx !== -1
    const containsToken = tokenIdx !== -1
    if (containsFrom && containsTo) {
      headTitles = [...headTitles, 'From Label', 'To Label']
    }
    if (containsToken) {
      headTitles.push('Token Label')
    }
    const uselessCols: number[] = []
    headTitles = headTitles.map((title, idx) => {
      if (!title) uselessCols.push(idx)
      if (title.indexOf('\n') !== -1) {
        return title.split('\n')[1]
      }
      return title
    })
    headTitles = headTitles.filter(
      (title, idx) => !!title && !filterIdxList.includes(idx)
    )
    const rowEls = table.querySelectorAll<HTMLElement>('tbody tr')
    let rows: string[][] = []
    const labelAddresses: string[] = []
    Array.from(rowEls).forEach(el => {
      const row: string[] = []
      const colEls = el.querySelectorAll<HTMLElement>(
        "td:not([style*='display: none']):not([style*='display:none'])"
      )
      let fromLabel = ''
      let toLabel = ''
      let tokenLabel = ''
      Array.from(colEls).forEach((td, idx) => {
        if (!uselessCols.includes(idx)) {
          if (idx === fromIdx || idx === toIdx) {
            const clipboardEl = td.querySelector<HTMLElement>(
              '.js-clipboard, .js-clipboard-required-confirmation'
            )
            let hashTagEl = td.querySelector<HTMLElement>('.hash-tag')
            if (!hashTagEl) {
              hashTagEl =
                clipboardEl?.previousElementSibling as HTMLElement | null
            }
            const address =
              clipboardEl?.getAttribute('data-clipboard-text') ?? ''
            const label = (hashTagEl?.innerText ?? '').trim()
            if (idx === fromIdx) {
              fromLabel = label
            } else {
              toLabel = label
            }
            if (isAddress(label)) {
              labelAddresses.push(label)
            }
            row.push(address)
          } else if (idx === tokenIdx) {
            const tagEl = td.querySelector<HTMLElement>("a[href^='/token/']")
            const href = tagEl?.getAttribute('href') ?? ''
            const tokenAddress =
              getHrefQueryVariable(href, 'a') ?? pickAddress(href) ?? ''
            tokenLabel = tagEl?.innerText ?? tokenAddress
            row.push(tokenAddress)
          } else if (!filterIdxList.includes(idx)) {
            row.push(td.innerText)
          }
        }
      })
      if (containsFrom && containsTo) {
        row.push(...[fromLabel, toLabel])
      }
      if (containsToken) {
        row.push(tokenLabel)
      }
      rows.push(row)
    })
    if ((containsFrom && containsTo) || containsToken) {
      const res = await chromeEvent.emit<
        typeof GET_ADDRESS_LABELS,
        AddressLabel[]
      >(GET_ADDRESS_LABELS, {
        chain: chain,
        addresses: labelAddresses
      })

      if (res?.success && res?.data?.length) {
        res.data.forEach(item => {
          rows.forEach(row => {
            const fromLabelPos = row.length - (containsToken ? 3 : 2)
            const toLabelPos = row.length - (containsToken ? 2 : 1)
            const tokenLabelPos = row.length - 1
            const fromLabel = row[fromLabelPos]
            const toLabel = row[toLabelPos]
            if (fromLabel === item.address) {
              row[fromLabelPos] = item.label
            }
            if (toLabel === item.address) {
              row[toLabelPos] = item.label
            }
            if (containsToken) {
              const tokenLabel = row[tokenLabelPos]
              if (tokenLabel === item.address) {
                row[tokenLabelPos] = item.label
              }
            }
          })
        })
      }
      rows = rows.map(row => {
        const _row = [...row]
        const fromLabelPos = _row.length - (containsToken ? 3 : 2)
        const toLabelPos = _row.length - (containsToken ? 2 : 1)
        const tokenLabelPos = _row.length - 1
        const fromLabel = _row[fromLabelPos]
        const toLabel = _row[toLabelPos]
        if (isAddress(fromLabel)) {
          _row[fromLabelPos] = ''
        }
        if (isAddress(toLabel)) {
          _row[toLabelPos] = ''
        }
        if (containsToken) {
          const tokenLabel = _row[_row.length - 1]
          if (isAddress(tokenLabel)) {
            _row[tokenLabelPos] = ''
          }
        }
        return _row
      })
    }

    if (key === 'csv') {
      downloadCsv(`${chain}-${Date.now()}`, [headTitles, ...rows])
    }

    if (key === 'json') {
      const jsonObj: Record<string, any> = {}
      rows.forEach((row, index) => {
        jsonObj[index] = {}
        row.forEach((col, idx) => {
          const key = headTitles[idx]?.replaceAll(' ', '')
          jsonObj[index][key] = col
        })
      })
      downloadJson(`${chain}-${Date.now()}`, jsonObj)
    }
  }

  return (
    <Dropdown
      menus={menus}
      onClick={onClick}
      btnClassNames="btn btn-sm btn-primary dropdown-toggle"
    >
      <IconDownload size={12} mr={4} color="#fff" />
      Export Current Page Data
    </Dropdown>
  )
}

export default ExportTableDataBtn
