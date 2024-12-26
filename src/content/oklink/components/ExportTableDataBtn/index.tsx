import React, { type FC } from 'react'

import { downloadJson, downloadCsv } from '@common/utils'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { TokenSymbol } from '@src/common/components'
import styles from './index.module.less'
import { ADDRESS_ATTR } from '../../constant/enum'
import { getOKLinkImage } from '../../utils'
import META_SUITES_CLASS from '../../constant/metaSuites'
import OKLinkImage from '../OKLinkImage'

interface Props {
  chain: string
  table: HTMLElement
}

const ExportTableDataBtn: FC<Props> = ({ chain, table }) => {
  const items: MenuProps['items'] = [
    {
      label: 'csv',
      key: 'csv'
    },
    {
      label: 'json',
      key: 'json'
    }
  ]

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    const tableHeadEls = table.querySelectorAll<HTMLElement>(
      "thead tr th:not([class='d-none'])"
    )
    let headTitles = Array.from(tableHeadEls).map(th => {
      return th.innerText.trim()
    })
    headTitles = headTitles.map(title => {
      if (title.indexOf('\n') !== -1) {
        return title.split('\n')[1]
      }
      return title
    })
    const rowEls = table.querySelectorAll<HTMLElement>(
      'tbody tr:not([aria-hidden])'
    )

    let addressIndex: number[] = []

    rowEls.forEach(el => {
      const colEls = el.querySelectorAll<HTMLElement>(
        "td:not([style*='display: none']):not([style*='display:none'])"
      )
      const tempAddressIndexs: number[] = []
      colEls.forEach((tdDom, index) => {
        const addressDom = tdDom.querySelector(META_SUITES_CLASS.addressParent)
        if (!addressDom) {
          return
        }
        tempAddressIndexs.push(index)
      })
      if (tempAddressIndexs.length > addressIndex.length) {
        addressIndex = tempAddressIndexs
      }
    })

    if (addressIndex.length > 0) {
      addressIndex.forEach(addressIdx => {
        headTitles.push(headTitles[addressIdx] + ' Label')
      })
    }

    const rows: string[][] = []
    rowEls.forEach(el => {
      const row: string[] = []
      const colEls = el.querySelectorAll<HTMLElement>(
        "td:not([style*='display: none']):not([style*='display:none'])"
      )
      colEls.forEach(td => {
        row.push(td.innerText)
      })
      if (addressIndex.length > 0) {
        addressIndex.forEach(addressIdx => {
          const addressDom = colEls[addressIdx].querySelector(
            META_SUITES_CLASS.addressParent
          )
          let realAddress = ''
          let label = ''
          if (addressDom) {
            realAddress = addressDom.getAttribute(ADDRESS_ATTR) || ''
            const text = colEls[addressIdx].innerText
            if (text && text.length > 4) {
              const prefixStr = text.slice(0, 4)
              if (realAddress.indexOf(prefixStr) === -1) {
                label = text
              }
            } else {
              label = text
            }
          }
          row[addressIdx] = realAddress
          row.push(label)
        })
      }

      rows.push(row)
    })

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
      placement="bottomRight"
      trigger={['click']}
      menu={{ items, onClick }}
    >
      <div className={styles.dropdownBox}>
        <TokenSymbol
          size={14.4}
          style={{ marginRight: 0, verticalAlign: 'middle' }}
        />
        Download current page data
        <OKLinkImage
          className={styles.img}
          src={getOKLinkImage('arrow-down')}
        />
      </div>
    </Dropdown>
  )
}

export default ExportTableDataBtn
