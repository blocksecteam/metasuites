import classNames from 'classnames'
import { type FC, memo } from 'react'

import { TokenSymbol } from '@common/components'

import styles from './index.module.less'
import Link from '../../Link'

interface Props {
  mounted: boolean
}

const Label: FC<Props> = ({ mounted }) => {
  return (
    <div className={styles.labelBox}>
      <Link
        href="https://blocksec.com/metasuites"
      >
        <TokenSymbol
          size={17}
          className={classNames(styles.mdLogo, { [styles.animation]: mounted })}
        />
      </Link>
      Transaction Explanation:
    </div>
  )
}

export default memo(Label);
