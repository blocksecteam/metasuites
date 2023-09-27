import React from 'react'

import type { BaseComponent } from '@src/common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
  onClick?: () => void
}

export default function IconClose({
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
      width={size}
      style={stylesheet}
      height={size}
      className={className}
      // @ts-ignore
      t="1695174402506"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3784"
      onClick={onClick}
    >
      <path
        fill={color}
        d="M817.28 812.8l-121.856-0.576L512 593.6l-183.232 218.496-121.984 0.512a14.72 14.72 0 0 1-14.784-14.72 15.36 15.36 0 0 1 3.52-9.6l240.064-286.08-240.064-285.824A14.784 14.784 0 0 1 206.72 192l121.984 0.512L512 411.264l183.232-218.496 121.792-0.64c8.128 0 14.784 6.528 14.784 14.848a15.36 15.36 0 0 1-3.52 9.6L588.608 502.4l239.872 286.08a14.784 14.784 0 0 1-11.264 24.32z"
        p-id="3785"
      />
    </svg>
  )
}
