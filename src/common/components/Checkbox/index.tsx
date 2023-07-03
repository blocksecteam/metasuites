import type { FC, ChangeEvent } from 'react'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'
import { Iconfont } from '@common/components'

import styles from './index.module.less'

interface Props extends BaseComponent {
  checked: boolean
  onChange: (val: boolean) => void
}

const Checkbox: FC<Props> = props => {
  const { className, style, checked, onChange } = props

  return (
    <label className={cls(styles.container, className)} style={style}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.checked)
        }}
      />
      <span className={styles.checkmark}>
        <Iconfont type="icon-check" size={12} color="#fff" />
      </span>
    </label>
  )
}

export default Checkbox
