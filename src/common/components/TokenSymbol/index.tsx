import { type FC } from 'react'

import { getImageUrl } from '@common/utils'
import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  logo?: string
  size?: number
  mr?: number
  ml?: number
}

const TokenSymbol: FC<Props> = ({
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
      verticalAlign: 'text-bottom'
    },
    style
  )

  return (
    <img
      style={stylesheet}
      className={className}
      src={logo || getImageUrl('default-token')}
      alt=""
    />
  )
}

export default TokenSymbol
