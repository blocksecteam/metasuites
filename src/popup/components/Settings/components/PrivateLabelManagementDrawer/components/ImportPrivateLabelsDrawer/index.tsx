import React, { type FC } from 'react'
import { Upload, message, type UploadProps } from 'antd'
import { parse } from 'papaparse'

import { Drawer, IconImport } from '@common/components'
import type { PrivateLabel } from '@src/store'
import { ChainType } from '@common/constants'
import { useStore } from '@common/hooks'
import { formatAddress } from '@common/utils'
import {
  LABEL_COLORS,
  DEFAULT_LABEL_COLOR
} from '@common/components/ModalAddPrivateLabel'

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
    beforeUpload: file => {
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isLt4M) {
        message.error('File must smaller than 4MB')
        return Upload.LIST_IGNORE
      }
      return true
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      parse(file as File, {
        complete: parsedData => {
          const [headerRow, ...dataRows] = parsedData.data as string[][]
          const jsonData = dataRows.map(row => {
            return headerRow.reduce((obj, header, index) => {
              obj[header] = row[index]
              if (!LABEL_COLORS.includes(obj.color?.toUpperCase())) {
                obj.color = DEFAULT_LABEL_COLOR
              }
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
        const supportedChainTypes = Object.values(ChainType).filter(
          item => item !== 'unknown'
        )
        const labels: PrivateLabel[] = response.filter((item: PrivateLabel) => {
          return (
            item.label &&
            item.address &&
            supportedChainTypes.includes(item.chainType) &&
            item.label.length <= 35
          )
        })
        const records = labels.reduce((obj, item) => {
          obj[`${item.chainType}-${formatAddress(item.address)}`] = item
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
            Only CSV format is supported for import, with a maximum file size of
            4MB. Please refer to the exported CSV format for the correct import
            format.
          </p>
        </Dragger>
      </div>
    </Drawer>
  )
}

export default ImportPrivateLabelsDrawer
