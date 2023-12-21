import { type FC, useState } from 'react'
import cls from 'classnames'

import { TokenSymbol } from '@common/components'

interface Props {
  onClick: () => void
}

const ExplainBtn: FC<Props> = ({ onClick }) => {
  const [visible, setVisible] = useState(true)

  return (
    <button
      className={cls('nav-link md-btn-primary')}
      style={{ color: 'white', display: visible ? 'block' : 'none' }}
      onClick={() => {
        onClick()
        setVisible(false)
      }}
    >
      <TokenSymbol color="#fff" />
      Explain with GPT
    </button>
  )
}

export default ExplainBtn
