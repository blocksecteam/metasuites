import React, { type FC } from 'react'

interface Props {
  size?: number
}

const LoadingOutlined: FC<Props> = props => {
  const { size = 16 } = props

  return (
    <img
      style={{ width: `${size}px`, height: `${size}px` }}
      src="https://assets.blocksec.com/image/1664189523021-2.gif"
      alt=""
    />
  )
}

export default LoadingOutlined
