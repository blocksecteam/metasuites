import { type FC } from 'react'
import cls from 'classnames'

import { TokenSymbol } from '@common/components'

import styles from './label.module.less'

const Label: FC = () => {
  return (
    <div className={cls(styles.label)}>
      <a
        target="_blank"
        href="https://blocksec.com/metasuites"
        style={{ display: 'contents' }}
      >
        <TokenSymbol size={18} className={cls(styles.logo)} />
      </a>
      <span>Transaction Explanation</span>
    </div>
  )
}

export default Label
