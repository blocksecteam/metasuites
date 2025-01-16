import { type FC, memo, useState } from 'react'
import classNames from 'classnames'
import META_SUITES_CLASS from '@src/content/oklink/constant/metaSuites'
import styles from './index.module.less'

interface Props {
  type: string
}

const Input: FC<Props> = ({ type }) => {
  const [value, setValue] = useState<string>()
  const [focused, setFocused] = useState<boolean>(false)
  return (
    <div className={classNames(styles.inputBox, focused && styles.focused)}>
      <input
        className={classNames(
          META_SUITES_CLASS.contractInput.slice(1),
          styles.input
        )}
        type="text"
        placeholder={`(${type})`}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default memo(Input)
