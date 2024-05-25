import React from 'react'

import type { BaseComponent } from '@src/common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
  onClick?: () => void
}

export default function IconExplorer({
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
      <g clipPath="url(#clip0_103_2366)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.733398 8C0.733398 3.98673 3.98679 0.733337 8.00006 0.733337C12.0133 0.733337 15.2667 3.98673 15.2667 8C15.2667 12.0133 12.0133 15.2667 8.00006 15.2667C3.98679 15.2667 0.733398 12.0133 0.733398 8ZM2.17263 6.3075C2.01688 6.84469 1.9334 7.4126 1.9334 8C1.9334 10.4744 3.41477 12.6028 5.53903 13.5467L7.65326 11.5835C6.68538 11.491 5.82935 11.0153 5.23863 10.3098C5.20558 10.2819 5.17504 10.25 5.14776 10.2142L2.17263 6.3075ZM2.70856 5.03058L4.46178 7.33277C4.77464 5.66333 6.23981 4.4 8.00006 4.4H12.8836C11.7788 2.90375 10.0028 1.93334 8.00006 1.93334C5.72826 1.93334 3.74811 3.18206 2.70856 5.03058ZM13.5735 5.6H10.6834C11.2534 6.23691 11.6001 7.07798 11.6001 8C11.6001 9.13929 11.0709 10.155 10.2448 10.8146L6.85818 13.9594C7.22801 14.0298 7.60973 14.0667 8.00006 14.0667C11.3506 14.0667 14.0667 11.3505 14.0667 8C14.0667 7.1475 13.8909 6.33607 13.5735 5.6ZM9.54688 9.83512C10.0686 9.39487 10.4001 8.73614 10.4001 8C10.4001 6.67451 9.32556 5.6 8.00006 5.6C6.67457 5.6 5.60006 6.67451 5.60006 8C5.60006 9.3255 6.67457 10.4 8.00006 10.4C8.55154 10.4 9.05956 10.214 9.46483 9.90133L9.47309 9.89366C9.4965 9.87192 9.52119 9.85241 9.54688 9.83512Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_103_2366">
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  )
}
