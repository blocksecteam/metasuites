import React, { type FC, useState, useMemo } from 'react'
import { Button, Input, Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { Drawer, IconDownload, IconImport } from '@common/components'
import { usePrivateLabels } from '@common/hooks'
import { downloadCsv } from '@common/utils'

import styles from './index.module.less'
import { ImportPrivateLabelsDrawer, LabelItem } from './components'

interface Props {
  visible: boolean
  onClose: () => void
}

const PrivateLabelManagementDrawer: FC<Props> = ({ visible, onClose }) => {
  const { privateLabels } = usePrivateLabels()

  const [keyword, setKeyword] = useState('')

  const [importDrawerVisible, setImportDrawerVisible] = useState(false)

  const labelList = useMemo(() => {
    return Object.values(privateLabels).filter(item => {
      if (keyword.trim()) {
        return (
          item.label.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
          item.address.toLowerCase().indexOf(keyword.toLowerCase()) > -1
        )
      } else {
        return true
      }
    })
  }, [privateLabels, keyword])

  return (
    <Drawer title="Local Private Label" visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.btns}>
          <Button
            ghost
            type="primary"
            className={styles.importBtn}
            onClick={() => setImportDrawerVisible(true)}
          >
            <IconImport color="#00A54C" mr={4} size={20} />
            Import
          </Button>
          <Button
            ghost
            type="primary"
            className={styles.exportBtn}
            onClick={() => {
              const filteredLabels = Object.values(privateLabels).map(item => {
                const { address, label, color, chainType } = item
                return {
                  address,
                  label,
                  color: color || '',
                  chainType
                }
              })
              downloadCsv('local-labels', filteredLabels)
            }}
          >
            <IconDownload color="#00A54C" mr={4} size={20} />
            Export
          </Button>
        </div>
        <Input
          className={styles.search}
          prefix={<SearchOutlined />}
          placeholder="Search for Local Private Label"
          onChange={e => setKeyword(e.target.value)}
        />
        <div className={styles.labels}>
          {labelList.length ? (
            labelList.map((item, index) => (
              <LabelItem key={index} data={item} />
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
      <ImportPrivateLabelsDrawer
        visible={importDrawerVisible}
        onClose={() => setImportDrawerVisible(false)}
      />
    </Drawer>
  )
}

export default PrivateLabelManagementDrawer
