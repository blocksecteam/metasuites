import React from 'react'

import type { BaseComponent } from '@src/common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
  onClick?: () => void
}

export default function IconEdit({
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
        d="M2.69326 12.1156L2.7042 12.1265C2.80889 12.2265 2.95732 12.2781 3.11045 12.2515L6.69639 11.6187C6.79483 11.6015 6.88076 11.5531 6.94639 11.4875L6.94795 11.489L13.3901 5.04216C13.9386 4.49373 13.9386 3.60154 13.3901 3.0531L11.7558 1.41716C11.4901 1.15154 11.137 1.00623 10.762 1.00623C10.387 1.00623 10.0323 1.15154 9.76826 1.41716L3.32451 7.86404L3.32607 7.8656C3.26045 7.93123 3.21201 8.01716 3.19482 8.1156L2.56201 11.7047C2.53701 11.8594 2.59014 12.0109 2.69326 12.1156ZM8.59482 3.9156L10.8933 6.2156L6.39326 10.7203L3.60264 11.2125L4.09482 8.42029L8.59482 3.9156ZM10.4292 2.07966C10.5167 1.99216 10.6339 1.94373 10.7605 1.94373C10.887 1.94373 11.0042 1.99216 11.0917 2.07966L12.7276 3.7156C12.9105 3.89841 12.9105 4.19685 12.7276 4.37966L11.5573 5.55154L9.25889 3.25154L10.4292 2.07966ZM14.5151 14.0687H1.45264C1.19482 14.0687 0.983887 14.2797 0.983887 14.5375C0.983887 14.7953 1.19482 15.0062 1.45264 15.0062H14.5151C14.773 15.0062 14.9839 14.7953 14.9839 14.5375C14.9839 14.2797 14.773 14.0687 14.5151 14.0687Z"
        fill={color}
      />
    </svg>
  )
}
