import type { FC, ChangeEvent } from 'react'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'

import styles from './index.module.less'

interface Props extends BaseComponent {
  checked: boolean
  round?: boolean
  onChange: (val: boolean) => void
}

const Switch: FC<Props> = props => {
  const { round = true, className, style, checked, onChange } = props

  return (
    <label className={cls(styles.switch, className)} style={style}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
      />
      <span className={cls(styles.slider, { [styles.round]: round })}></span>
    </label>
  )
}

export default Switch
