import { type FC, useState, useRef } from 'react'
import cls from 'classnames'

import { TokenSymbol } from '@common/components'
import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  onClick: (errorCallback: () => void) => void
}

const ContractVariableLogBtn: FC<Props> = ({ onClick, className, style }) => {
  const [error, setError] = useState(false)
  const timer = useRef<NodeJS.Timeout>()

  const handleClick = () => {
    clearTimeout(timer.current)
    onClick(() => {
      setError(true)
      timer.current = setTimeout(() => {
        setError(false)
      }, 3000)
    })
  }

  return (
    <>
      <button
        type="button"
        className={cls(
          'write-btn btn btn-primary border md-btn-primary',
          className
        )}
        style={style}
        onClick={handleClick}
      >
        <TokenSymbol color="#fff" />
        Logs
      </button>
      {error && (
        <span className="text-danger ms-2">
          Please complete all fields to see the logs of that variable.
        </span>
      )}
    </>
  )
}

export default ContractVariableLogBtn
