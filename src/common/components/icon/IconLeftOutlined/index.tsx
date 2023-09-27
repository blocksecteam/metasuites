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

const IconLeftOutlined: FC<Props> = ({
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
      t="1672028012666"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3253"
    >
      <path
        fill={color}
        d="M607.926197 960.049202a63.758945 63.758945 0 0 1-45.213214-18.737584l-351.729389-351.729388a63.886847 63.886847 0 0 1 0-90.426428l351.729389-351.729388a63.886847 63.886847 0 1 1 90.426428 90.426428L346.623237 544.369016l306.516174 306.516174A63.886847 63.886847 0 0 1 607.926197 960.049202"
        p-id="3254"
      />
    </svg>
  )
}

export default IconLeftOutlined
