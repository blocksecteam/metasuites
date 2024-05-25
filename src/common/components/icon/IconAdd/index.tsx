import React from 'react'

import type { BaseComponent } from '@src/common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
  onClick?: () => void
}

export default function IconAdd({
  size = 16,
  color = '#000',
  className,
  style = {},
  ml = 0,
  mr = 0,
  onClick
}: Props) {
  const stylesheet = Object.assign(
    { margin: 0, marginLeft: ml, marginRight: mr, cursor: 'pointer' },
    style
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={stylesheet}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.5C8.27614 2.5 8.5 2.72386 8.5 3V7.5H13C13.2761 7.5 13.5 7.72386 13.5 8C13.5 8.27614 13.2761 8.5 13 8.5H8.5V13C8.5 13.2761 8.27614 13.5 8 13.5C7.72386 13.5 7.5 13.2761 7.5 13V8.5H3C2.72386 8.5 2.5 8.27614 2.5 8C2.5 7.72386 2.72386 7.5 3 7.5H7.5V3C7.5 2.72386 7.72386 2.5 8 2.5Z"
        fill={color}
      />
    </svg>
  )
}
