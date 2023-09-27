import React, { type FC } from 'react'

import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
  rotate?: number
  scale?: number
}

const IconArrowRightOutlined: FC<Props> = ({
  size = 16,
  color = '#000000',
  className,
  style = {},
  ml = 0,
  mr = 0,
  rotate = 0,
  scale = 1
}) => {
  const stylesheet = Object.assign(
    {
      margin: 0,
      marginLeft: ml,
      marginRight: mr,
      transform: `rotate(${rotate ?? 0}deg) scale(${scale})`
    },
    style
  )

  return (
    <svg
      width={size}
      style={stylesheet}
      height={size}
      className={className}
      // @ts-ignore
      t="1695174161045"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3649"
    >
      <path
        d="M478.592 128l-44.352 43.392 368.192 342.336-331.264 341.12 46.528 41.152 373.376-384.512z"
        p-id="3650"
        fill={color}
      />
      <path d="M128 539.712h704v-64H128z" p-id="3651" fill={color} />
    </svg>
  )
}

export default IconArrowRightOutlined
