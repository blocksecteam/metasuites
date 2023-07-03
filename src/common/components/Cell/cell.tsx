import React, { type FC, type ReactNode, type MouseEvent } from 'react'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'
import { Iconfont } from '@common/components'

import styles from './index.module.less'

export interface CellProps extends BaseComponent {
  icon?: string
  pointer?: boolean
  action?: ReactNode
  title: ReactNode
  desc?: string
  border?: boolean
  onClick?: (e: MouseEvent) => void
}

const Cell: FC<CellProps> = props => {
  const { title, desc, action, icon, border = true, pointer, onClick } = props

  return (
    <div className={styles.container} onClick={onClick}>
      <div
        className={cls(styles.content, {
          [styles.border]: border,
          [styles.pointer]: pointer ? pointer : !action
        })}
      >
        <div className="align-center">
          {icon && <img className={styles.icon} src={icon} alt="" />}
          <div className={styles.title}>
            <span style={{ fontSize: desc ? '14px' : '12px' }}>{title}</span>
            {desc && <span>{desc}</span>}
          </div>
        </div>
        {action ? (
          <div className={styles.action}>{action}</div>
        ) : (
          <div className={styles.iconContainer}>
            <Iconfont type="icon-arrow-right" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Cell
