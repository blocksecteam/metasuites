import { type FC } from 'react'
import cls from 'classnames'
import { Button } from 'antd'
import { TokenSymbol } from '@common/components'
import styles from './index.module.less'

const classNames = cls(styles.btn)

interface Props {
  onClick: () => void
}

const ExplainBtn: FC<Props> = ({ onClick }) => {
  return (
    <Button
      type="primary"
      icon={<TokenSymbol color="#fff" />}
      className={classNames}
      onClick={onClick}
    >
      Explain with GPT
    </Button>
  )
}

export default ExplainBtn
