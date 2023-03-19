import cls from 'classnames'
import { type FC, useState } from 'react'

import styles from './index.module.less'

interface Props {
  onClick: () => void
}

const FormatParamBtn: FC<Props> = ({ onClick }) => {
  const [formatted, setFormatted] = useState(false)

  const onFormat = () => {
    onClick()
    setFormatted(true)
    setTimeout(() => {
      setFormatted(false)
    }, 2000)
  }

  return (
    <span
      className={cls(styles.formatParamBtn, 'btn btn-sm ml-2 mb-2')}
      onClick={onFormat}
    >
      {formatted ? (
        <img
          className={styles.iconSuccess}
          src="https://assets.blocksec.com/image/1677842150736-2.png"
          alt=""
        />
      ) : (
        <img
          className={styles.iconFormat}
          src="https://assets.blocksec.com/image/1677812164206-2.png"
          alt=""
        />
      )}
    </span>
  )
}

export default FormatParamBtn
