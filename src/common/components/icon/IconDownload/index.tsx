import React, { type FC } from 'react'

import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
  onClick?: () => void
}

const IconDownload: FC<Props> = ({
  size = 16,
  color = '#000000',
  className,
  style = {},
  ml = 0,
  mr = 0,
  onClick
}) => {
  const stylesheet = Object.assign(
    { margin: 0, marginLeft: ml, marginRight: mr },
    style
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      style={stylesheet}
      viewBox="0 0 20 20"
      fill="none"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.875C10.3452 1.875 10.625 2.15482 10.625 2.5V12.2411L13.3081 9.55806C13.5521 9.31398 13.9479 9.31398 14.1919 9.55806C14.436 9.80214 14.436 10.1979 14.1919 10.4419L10.4419 14.1919C10.1979 14.436 9.80214 14.436 9.55806 14.1919L5.80806 10.4419C5.56398 10.1979 5.56398 9.80214 5.80806 9.55806C6.05214 9.31398 6.44786 9.31398 6.69194 9.55806L9.375 12.2411V2.5C9.375 2.15482 9.65482 1.875 10 1.875ZM2.5 13.125C2.84518 13.125 3.125 13.4048 3.125 13.75V15.625C3.125 15.9565 3.2567 16.2745 3.49112 16.5089C3.72554 16.7433 4.04348 16.875 4.375 16.875H15.625C15.9565 16.875 16.2745 16.7433 16.5089 16.5089C16.7433 16.2745 16.875 15.9565 16.875 15.625V13.75C16.875 13.4048 17.1548 13.125 17.5 13.125C17.8452 13.125 18.125 13.4048 18.125 13.75V15.625C18.125 16.288 17.8616 16.9239 17.3928 17.3928C16.9239 17.8616 16.288 18.125 15.625 18.125H4.375C3.71196 18.125 3.07607 17.8616 2.60723 17.3928C2.13839 16.9239 1.875 16.288 1.875 15.625V13.75C1.875 13.4048 2.15482 13.125 2.5 13.125Z"
        fill={color}
      />
    </svg>
  )
}

export default IconDownload
