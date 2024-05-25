import React, { type FC } from 'react'

import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
  onClick?: () => void
}

const IconImport: FC<Props> = ({
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
      style={stylesheet}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.55806 2.05806C9.80214 1.81398 10.1979 1.81398 10.4419 2.05806L14.1919 5.80806C14.436 6.05214 14.436 6.44786 14.1919 6.69194C13.9479 6.93602 13.5521 6.93602 13.3081 6.69194L10.625 4.00888V13.75C10.625 14.0952 10.3452 14.375 10 14.375C9.65482 14.375 9.375 14.0952 9.375 13.75V4.00888L6.69194 6.69194C6.44786 6.93602 6.05214 6.93602 5.80806 6.69194C5.56398 6.44786 5.56398 6.05214 5.80806 5.80806L9.55806 2.05806ZM2.5 13.125C2.84518 13.125 3.125 13.4048 3.125 13.75V15.625C3.125 15.9565 3.2567 16.2745 3.49112 16.5089C3.72554 16.7433 4.04348 16.875 4.375 16.875H15.625C15.9565 16.875 16.2745 16.7433 16.5089 16.5089C16.7433 16.2745 16.875 15.9565 16.875 15.625V13.75C16.875 13.4048 17.1548 13.125 17.5 13.125C17.8452 13.125 18.125 13.4048 18.125 13.75V15.625C18.125 16.288 17.8616 16.9239 17.3928 17.3928C16.9239 17.8616 16.288 18.125 15.625 18.125H4.375C3.71196 18.125 3.07607 17.8616 2.60723 17.3928C2.13839 16.9239 1.875 16.288 1.875 15.625V13.75C1.875 13.4048 2.15482 13.125 2.5 13.125Z"
        fill={color}
      />
    </svg>
  )
}

export default IconImport
