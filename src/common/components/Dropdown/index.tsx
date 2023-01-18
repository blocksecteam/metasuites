import React, { type FC, type PropsWithChildren, useState } from 'react'
import cls from 'classnames'

import styles from './index.module.less'

export type DropdownMenus = { key: string; label: string }[]

interface Props {
  btnClassNames?: string
  menus: DropdownMenus
  onClick: (key: string) => void
}

const Dropdown: FC<PropsWithChildren<Props>> = ({
  menus,
  btnClassNames,
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
      className={cls(styles.dropdown, { [styles.open]: open })}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        className={cls(styles.btn, btnClassNames)}
        style={{ color: '#fff', cursor: 'pointer' }}
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
