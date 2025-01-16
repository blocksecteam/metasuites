import { type FC, memo } from 'react'
import { isAddress } from 'ethers'

import type { PrivateVariableArgument } from '@common/api/types'
import classNames from 'classnames'
import { getAddressUrl } from '@src/content/oklink/utils/dealUrl'
import styles from './index.module.less'
import Link from '../../../Link'

interface Props {
  value?: PrivateVariableArgument
  className?: string
}

const Value: FC<Props> = ({ value, className }) => {
  const renderValue = (v?: PrivateVariableArgument) => {
    if (v) {
      if (isAddress(v.value)) {
        return (
          <Link
            className={styles.link}
            href={getAddressUrl({ address: v.value })}
          >
            {v.value}
          </Link>
        )
      }
      if (typeof v.value === 'string') {
        return <span className="f-filter">{v.value}</span>
      } else {
        return <span className="f-filter">{JSON.stringify(v.value)}</span>
      }
    }
    return null
  }

  return (
    <div className={classNames(styles.resultBox, className)}>
      <i className={styles.type}>{value?.type}</i>
      <span className={styles.valueBox}>:&nbsp;{renderValue(value)}</span>
    </div>
  )
}

export default memo(Value)
