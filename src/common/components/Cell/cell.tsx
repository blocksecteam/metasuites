import React, { type FC, type ReactNode, type MouseEvent } from 'react'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'
import { IconArrowRightOutlined } from '@common/components'

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
  const {
    className,
    style,
    title,
    desc,
    action,
    icon,
    border = true,
    pointer,
    onClick
  } = props

  return (
    <div
      className={cls(styles.container, className, {
        [styles.border]: border,
        [styles.pointer]: pointer ? pointer : action === undefined
      })}
      style={style}
      onClick={onClick}
    >
      <div className="align-center flex1">
        {icon && <img className={styles.icon} src={icon} alt="" />}
        <div className={cls(styles.title, 'flex1')}>
          <span style={{ fontSize: desc ? '14px' : '12px' }}>{title}</span>
          {desc && <span>{desc}</span>}
        </div>
      </div>
      {action !== undefined ? (
        <div className={styles.action}>{action}</div>
      ) : (
        <div className={styles.iconContainer}>
          <IconArrowRightOutlined />
        </div>
      )}
    </div>
  )
}

export default Cell
