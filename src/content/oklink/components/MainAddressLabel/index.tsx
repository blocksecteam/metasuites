import { type FC } from 'react'
import { Tooltip } from 'antd'

import type { AddressLabel } from '@common/api/types'
import { TokenSymbol } from '@common/components'
import Title from './Title'
import styles from './index.module.less'

interface Props {
  data: AddressLabel
}

const MainAddressLabel: FC<Props> = ({
  data: { label, implementLabel, implementAddress }
}) => {
  return (
    <Tooltip
      title={
        <Title
          implementLabel={implementLabel}
          implementAddress={implementAddress}
        />
      }
    >
      <div className={styles.label}>
        <TokenSymbol mr={4} size={14.44} />
        {label}
      </div>
    </Tooltip>
  )
}

export default MainAddressLabel
