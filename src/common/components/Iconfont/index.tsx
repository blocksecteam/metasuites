import cls from 'classnames'
import React, { type CSSProperties } from 'react'

import type { BaseComponent } from '@common/types'
import '@src/assets/iconfont/iconfont.css'

interface IconFontProps extends BaseComponent {
  color?: CSSProperties['color']
  size?: number
  rotate?: number
  /** image type */
  type: string
  scale?: number
  /** margin-left */
  ml?: number
  /** margin-right */
  mr?: number
  cursor?: string
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export default function Iconfont(props: IconFontProps) {
  const {
    color,
    size = 16,
    className,
    type,
    style,
    rotate,
    scale,
    ml,
    mr,
    cursor = 'default',
    ...rest
  } = props
  const styleSheet: CSSProperties = Object.assign(
    {
      color,
      fontSize: `${size}px`,
      lineHeight: `${size}px`,
      transform: `rotate(${rotate ?? 0}deg) scale(${scale ?? 1})`,
      marginLeft: `${ml}px`,
      marginRight: `${mr}px`,
      transition: 'all 0.3s',
      cursor
    },
    style
  )
  return (
    <i
      style={styleSheet}
      className={cls(type, 'iconfont', className)}
      {...rest}
    />
  )
}
