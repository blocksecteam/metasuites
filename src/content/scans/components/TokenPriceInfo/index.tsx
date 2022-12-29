import { type FC } from 'react'
import cls from 'classnames'

import type { NFTPriceResponse } from '@common/api/types'

import styles from './index.module.less'

interface Props {
  data: NFTPriceResponse
}

const TokenPriceInfo: FC<Props> = ({ data: { priceUSD, price } }) => {
  return (
    <div className={styles.tokenPriceInfo}>
      <div className={styles.infoItem}>
        <div className={cls(styles.label, 'text-secondary small text-muted')}>
          Floor Price
        </div>
        <div className={styles.value}>
          {`$${priceUSD}`}
          <span className="text-secondary small text-nowrap"> @ {price}</span>
        </div>
      </div>
    </div>
  )
}

export default TokenPriceInfo
