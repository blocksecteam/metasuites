import { type FC } from 'react'
import cls from 'classnames'

import type { AddressFunderRiskRes } from '@common/api/types'
import { TokenSymbol } from '@common/components'

import styles from './index.module.less'

interface Props {
  data: AddressFunderRiskRes
}

const FundFromTag: FC<Props> = ({ data: { risky, label, address } }) => {
  return (
    <div className={styles.fundFromTag}>
      <div className={styles.label}>Fund From</div>
      <div className={styles.value}>
        <TokenSymbol />
        <a
          href={`/address/${address}`}
          target="_blank"
          rel="noreferrer"
          className={cls({ [styles.risky]: risky })}
        >
          {label}
        </a>
      </div>
    </div>
  )
}

export default FundFromTag
