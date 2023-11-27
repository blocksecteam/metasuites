import React, { type FC } from 'react'
import { ConfigProvider, Dropdown, type MenuProps, Button, Space } from 'antd'
import $ from 'jquery'
import { DownOutlined } from '@ant-design/icons'

import { pickAddress, downloadJson, downloadCsv } from '@common/utils'
import { IconDownload } from '@common/components'

import { getTextWithoutRemarkLabel } from '../../helper'

interface Props {
  chain: string
  table: JQuery<HTMLElement>
}

const ExportTableDataBtn: FC<Props> = ({ chain, table }) => {
  const items: MenuProps['items'] = [
    {
      key: 'csv',
      label: 'csv'
    },
    {
      key: 'json',
      label: 'json'
    }
  ]

  const removeUselessRow = (
    titles: string[],
    rows: string[][]
  ): [string[], string[][]] => {
    const uselessRow: number[] = []
    rows.forEach(row => {
      titles.forEach((title, index) => {
        if (row[index] === '' && title === '') {
          if (!uselessRow.includes(index)) uselessRow.push(index)
        }
      })
    })
    const headTitles = titles.filter((_, index) => !uselessRow.includes(index))

    const newRows = rows.map(row =>
      row.filter((_, index) => !uselessRow.includes(index))
    )
    return [headTitles, newRows]
  }

  const onClick = async (key: string) => {
    const tableHeadEls = table.find('thead tr th')

    let headTitles = tableHeadEls
      .map(function () {
        return $(this).text().trim()
      })
      .get()

    const rowEls = table.find('tbody tr')

    let rows: string[][] = []
    rowEls.each(function () {
      const row: string[] = []
      const colEls = $(this).find('td')
      colEls.each(function () {
        const text = getTextWithoutRemarkLabel($(this))

        const addressLinkEl = $(this).find('.address-link-wrap a.address-link')
        const href = addressLinkEl.attr('href')

        if (addressLinkEl.length && href) {
          const addr =
            pickAddress(href) || pickAddress(window.location.hash) || text
          const label = addressLinkEl.attr('data-label')
          row.push(`${addr}${label ? `(${label})` : ''}`)
        } else {
          row.push(text)
        }
      })
      rows.push(row)
    })
    ;[headTitles, rows] = removeUselessRow(headTitles, rows)

    console.log('====headTitles====', headTitles)
    console.log('====rows====', rows)

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
    <ConfigProvider
      prefixCls="metadock"
      theme={{
        token: {
          colorPrimary: '#00a54c'
        },
        components: {
          Button: { fontWeight: 600, fontSize: 12, controlOutlineWidth: 0 }
        }
      }}
    >
      <Dropdown
        arrow
        menu={{ items, onClick: e => onClick(e.key) }}
        placement="bottomLeft"
      >
        <Button
          size="small"
          type="primary"
          className="align-center"
          icon={<IconDownload size={12} color="#fff" />}
        >
          <Space>
            Export Current Page Data
            <DownOutlined style={{ verticalAlign: 0 }} />
          </Space>
        </Button>
      </Dropdown>
    </ConfigProvider>
  )
}

export default ExportTableDataBtn
