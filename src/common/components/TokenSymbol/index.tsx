import { type FC } from 'react'

import type { BaseComponent } from '@common/types'
import { IconMetaDock } from '@common/components'

interface Props extends BaseComponent {
  logo?: string
  size?: number
  mr?: number
  ml?: number
  color?: string
}

const TokenSymbol: FC<Props> = ({
  color,
  logo,
  style = {},
  size = 14,
  className,
  mr = 3,
  ml = 0
}) => {
  const stylesheet = Object.assign(
    {
      width: `${size}px`,
      height: `${size}px`,
      marginRight: `${mr}px`,
      marginLeft: `${ml}px`,
      verticalAlign: 'text-bottom',
      flexShrink: 0
    },
    style
  )

  return logo ? (
    <img style={stylesheet} className={className} src={logo} alt="" />
  ) : (
    <IconMetaDock style={stylesheet} className={className} color={color} />
  )
}

export default TokenSymbol
