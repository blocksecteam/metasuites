import React, { type FC, type PropsWithChildren } from 'react'
import cls from 'classnames'
import type { BaseComponent } from '@common/types'

import styles from './index.module.less'

export interface CellGroupProps extends BaseComponent {
  border?: boolean
}

const CellGroup: FC<PropsWithChildren<CellGroupProps>> = ({
  border,
  className,
  style,
  children
}) => {
  return (
    <div
      className={cls(styles.container, className, {
        [styles.border]: border
      })}
      style={style}
    >
      {children}
    </div>
  )
}

export default CellGroup
