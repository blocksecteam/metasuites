import { type FC, useMemo } from 'react'

import { Tooltip } from 'antd'
import { TokenSymbol } from '@common/components'
import styles from './index.module.less'

interface Props {
  label: string
  address: string
}

const AddressLabels: FC<Props> = ({ label, address }) => {
  const title = useMemo(() => {
    return (
      <div className={styles.title}>
        <div>{label}</div>
        <div>{address}</div>
      </div>
    )
  }, [])
  return (
    <Tooltip className={styles.address} title={title}>
      <TokenSymbol
        size={14.4}
        style={{ marginRight: 4, verticalAlign: 'middle' }}
      />
      <span style={{ verticalAlign: 'middle' }}>{label}</span>
    </Tooltip>
  )
}

export default AddressLabels
