import React, {
  type FC,
  type PropsWithChildren,
  useState,
  type CSSProperties
} from 'react'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'

import styles from './index.module.less'

export type DropdownMenus = { key: string; label: string }[]

interface Props extends BaseComponent {
  btnClassNames?: string
  btnStyle?: CSSProperties
  menus: DropdownMenus
  onClick: (key: string) => void
}

const Dropdown: FC<PropsWithChildren<Props>> = ({
  className,
  style,
  menus,
  btnClassNames,
  btnStyle = {},
  onClick,
  children
}) => {
  const [open, setOpen] = useState(false)

  const handleClick = (key: string) => {
    setOpen(false)
    onClick(key)
  }

  return (
    <div
      style={style}
      className={cls(styles.dropdown, { [styles.open]: open }, className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        className={cls(styles.btn, btnClassNames)}
        style={Object.assign({ color: '#fff', cursor: 'pointer' }, btnStyle)}
      >
        {children}
      </a>
      <div className={styles.overlay}>
        {menus.map(item => (
          <div
            key={item.key}
            className={styles.menuItem}
            onClick={() => handleClick(item.key)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
