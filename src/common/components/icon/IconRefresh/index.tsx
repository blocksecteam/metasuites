import React, { type FC, useState } from 'react'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'

import styles from './index.module.less'

interface Props extends BaseComponent {
  size?: number
  color?: string
  onClick: () => void
}

const IconRefresh: FC<Props> = props => {
  const { size = 16, onClick, className, style, color = '#000000' } = props

  const [isRotating, setIsRotating] = useState(false)

  const handleClick = () => {
    onClick()
    setIsRotating(true)
    setTimeout(() => {
      setIsRotating(false)
    }, 1000)
  }

  return (
    <svg
      // @ts-ignore
      t="1680946788919"
      className={cls(
        styles.iconRefresh,
        { [styles['rotate']]: isRotating },
        className
      )}
      style={style}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4136"
      width={size}
      height={size}
      onClick={handleClick}
    >
      <path
        fill={color}
        d="M907.946667 612.693333c-21.504-4.266667-47.189333 8.533333-51.456 29.952a385.024 385.024 0 0 1-376.832 295.68c-214.186667 0-389.717333-175.701333-389.717334-389.973333 0-214.186667 175.530667-389.802667 389.717334-389.802667 98.474667 0 196.949333 38.570667 265.472 107.093334H565.248a42.922667 42.922667 0 0 0 0 85.674666h265.557333c21.333333 0 42.837333-17.066667 42.837334-42.837333V42.837333a42.922667 42.922667 0 0 0-85.674667 0V192.853333A467.2 467.2 0 0 0 475.306667 72.874667C214.186667 72.874667 0 287.061333 0 548.437333 0 809.813333 214.186667 1024 475.306667 1024c218.453333 0 406.869333-149.930667 462.506666-359.936 4.266667-21.333333-8.533333-42.837333-29.866666-51.370667z"
        p-id="4137"
      ></path>
    </svg>
  )
}

export default IconRefresh
