import React, { type FC } from 'react'

import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
}

const IconMetaSleuth: FC<Props> = ({
  size = 16,
  color = '#bd7c40',
  className,
  style = {},
  ml = 0,
  mr = 0
}) => {
  const stylesheet = Object.assign(
    {
      margin: 0,
      marginLeft: ml,
      marginRight: mr
    },
    style
  )

  return (
    <svg
      className={className}
      style={stylesheet}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <path
        d="M806.826667 556.373333v194.816l-330.538667 190.848v-5.461333l-2.432 1.450667V747.093333l330.496-190.72-0.042667 1.365334 2.517334-1.408zM981.333333 292.608l-8.576 6.869333 8.576-2.816-294.229333 235.818667-0.256-5.845333-2.218667 1.834666-2.133333-55.722666-74.88 27.264-78.890667 168.874666-214.058666 194.645334-0.256-6.101334-2.176 2.048-8.021334-206.592H233.898667l1.664-4.053333h-4.138667l52.010667-123.904 695.466666-232.32-1.792 1.408 4.224-1.408zM627.797333 85.333333l80.896 152.490667-1.706666 0.768 1.706666 3.242667-303.914666 144.554666 327.04-100.352 0.298666 0.597334 2.133334-0.597334 15.658666 29.610667-1.834666 0.597333 1.834666 3.413334-704.768 240.768 10.922667-7.808-10.922667 3.754666 2.218667-1.621333-4.693333 1.621333 202.368-143.061333L290.346667 123.733333l2.218666 1.28 0.256-1.28 103.637334 62.165334L625.365333 85.333333l0.426667 0.896 2.005333-0.896z"
        fill={color}
      />
    </svg>
  )
}

export default IconMetaSleuth
