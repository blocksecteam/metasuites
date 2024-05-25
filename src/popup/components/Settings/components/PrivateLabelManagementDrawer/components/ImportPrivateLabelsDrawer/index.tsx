import React, { type FC } from 'react'
import { Upload, message, type UploadProps } from 'antd'
import { parse } from 'papaparse'

import { Drawer, IconImport } from '@common/components'
import type { PrivateLabel } from '@src/store'
import { EXT_SUPPORT_WEB_LIST } from '@common/constants'
import { useStore } from '@common/hooks'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
}

const { Dragger } = Upload

const ImportPrivateLabelsDrawer: FC<Props> = ({ visible, onClose }) => {
  const [privateLabels, setPrivateLabels] = useStore('privateLabels')

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.csv',
    multiple: false,
    className: styles.upload,
    customRequest: async ({ file, onSuccess, onError }) => {
      parse(file as File, {
        complete: parsedData => {
          const [headerRow, ...dataRows] = parsedData.data as string[][]
          const jsonData = dataRows.map(row => {
            return headerRow.reduce((obj, header, index) => {
              obj[header.toLowerCase()] = row[index]
              return obj
            }, {} as Record<string, string>)
          })
          onSuccess?.(jsonData)
        },
        error: error => {
          onError?.(error)
        }
      })
    },
    onChange: async info => {
      const { status, response } = info.file
      if (status === 'done') {
        const chainList = EXT_SUPPORT_WEB_LIST.flatMap(item => [
          item,
          ...(item.testNets || [])
        ])
          .filter(item => item.chain)
          .map(item => item.chain)
        const labels: PrivateLabel[] = response.filter((item: PrivateLabel) => {
          return (
            item.label &&
            item.address &&
            chainList.includes(item.chain) &&
            item.label.length <= 35
          )
        })
        const records = labels.reduce((obj, item) => {
          obj[`${item.chain}-${item.address}`] = item
          return obj
        }, {} as Record<string, PrivateLabel>)
        setPrivateLabels({ ...privateLabels, ...records })
        message.success('Import success')
        onClose()
      } else if (status === 'error') {
        message.error('Import failed')
      }
    }
  }

  return (
    <Drawer title="Import" visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <Dragger {...uploadProps}>
          <p>
            <IconImport size={40} />
          </p>
          <p className={styles.description}>
            Support upload CSV files only, with a maximum file size of 1MB. Each
            import can include up to 1,000 addresses (labels optional).
          </p>
        </Dragger>
      </div>
    </Drawer>
  )
}

export default ImportPrivateLabelsDrawer
