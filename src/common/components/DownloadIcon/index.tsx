import React, { type FC } from 'react'

import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
}

const DownloadIcon: FC<Props> = ({
  size = 16,
  color = '#000000',
  className,
  style = {},
  ml = 0,
  mr = 0
}) => {
  const stylesheet = Object.assign(
    { margin: 0, marginLeft: ml, marginRight: mr },
    style
  )

  return (
    <svg
      width={size}
      height={size}
      className={className}
      style={stylesheet}
      // @ts-ignore
      t="1670057766693"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2923"
    >
      <path
        d="M505.7 661c3.2 4.1 9.4 4.1 12.6 0l112-141.7c4.1-5.2 0.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8z"
        p-id="2924"
        fill={color}
      />
      <path
        d="M878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
        p-id="2925"
        fill={color}
      />
    </svg>
  )
}

export default DownloadIcon
