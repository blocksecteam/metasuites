import { type FC } from 'react'
import cls from 'classnames'
import { Button as AntdButton } from 'antd'
import styles from './button.module.less'

interface Props {
  onClick: () => void
}

const Button: FC<Props> = ({ onClick }) => {
  return (
    <AntdButton className={cls(styles.btn)} onClick={onClick}>
      Explain with GPT
    </AntdButton>
  )
}

export default Button
