import React, { type CSSProperties } from 'react'

import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  src: string
  width?: number | 'string'
  height?: number | 'string'
  ml?: number
  mr?: number
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export default function Image(props: Props) {
  const { className, style, src, ml, mr, width, height, onClick } = props
  const styleSheet: CSSProperties = Object.assign(
    {
      marginLeft: `${ml}px`,
      marginRight: `${mr}px`,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height
    },
    style
  )
  return (
    <img
      src={src}
      style={styleSheet}
      className={className}
      alt=""
      onClick={onClick}
    />
  )
}
