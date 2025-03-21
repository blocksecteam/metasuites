import classNames from 'classnames'
import { type FC, memo } from 'react'

import { TokenSymbol } from '@common/components'

import styles from './index.module.less'

interface Props {
  loading: boolean
}

const LoadingLogo: FC<Props> = ({ loading }) => {
  return (
    <TokenSymbol
      className={classNames(styles.gptLogo, 'f-filter', {
        [styles.animation]: loading
      })}
      size={17}
      style={{ verticalAlign: 'sub' }}
      mr={6}
      logo="https://assets.blocksec.com/image/1681125752966-2.png"
    />
  )
}

export default memo(LoadingLogo)
