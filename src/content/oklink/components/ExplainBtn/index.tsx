import { type FC, useState } from 'react'
import { TokenSymbol } from '@common/components'
import styles from './index.module.less'

interface Props {
  onClick: () => void;
}

const ExplainBtn: FC<Props> = ({ onClick }) => {
  const [visible, setVisible] = useState(true)
  
  return (
    <button
      className={styles.btn}
      style={{ color: 'white', display: visible ? 'flex' : 'none' }}
      onClick={() => {
        onClick()
        setVisible(false)
      }}
    >
      <TokenSymbol mr={4} size={14.4} color="#fff" />
      <span>Explain with GPT</span>
    </button>
  )
}

export default ExplainBtn
