import React, { type FC } from 'react'
import { Popconfirm, type PopconfirmProps } from 'antd'
import { capitalize } from 'lodash-es'

import { CopyButton, IconDelete } from '@common/components'
import { getSubStr, hexToRgba, formatAddress } from '@common/utils'
import type { PrivateLabel } from '@src/store'
import { useStore } from '@common/hooks'
import { chromeEvent } from '@common/event'
import { REFRESH } from '@common/constants'

import styles from './index.module.less'

interface Props {
  data: PrivateLabel
}

const DEFAULT_LABEL_COLOR = '#D9D9D9'

const LabelItem: FC<Props> = ({
  data,
  data: { chainType, address, label }
}) => {
  const [privateLabels, setPrivateLabels] = useStore('privateLabels')

  const confirm: PopconfirmProps['onConfirm'] = () => {
    const labels = { ...privateLabels }
    delete labels[`${chainType}-${formatAddress(address)}`]
    setPrivateLabels(labels)
    chromeEvent.emit(REFRESH, true)
  }

  const color = data.color || DEFAULT_LABEL_COLOR

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={styles.label}
          style={{
            borderColor: hexToRgba(color, 0.2),
            backgroundColor: hexToRgba(color, 0.1)
          }}
        >
          <span style={{ backgroundColor: color }} className={styles.dot} />
          <span>{label}</span>
        </div>
        <div className={styles.addressWrapper}>
          <span className={styles.type}>{capitalize(chainType)}</span>
          <CopyButton hover text={address} ml={4}>
            <code className={styles.address}>
              {getSubStr(address, [10, 9])}
            </code>
          </CopyButton>
        </div>
      </div>
      <Popconfirm
        title="Delete the private label?"
        description="Are you sure to delete this private label?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <IconDelete />
      </Popconfirm>
    </div>
  )
}

export default LabelItem
