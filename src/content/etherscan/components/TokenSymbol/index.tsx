import { type FC } from 'react'

import { getImageUrl } from '@common/utils'
import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  logo?: string
  size?: number
}

const TokenSymbol: FC<Props> = ({ logo, style = {}, size = 14, className }) => {
  const stylesheet = Object.assign(
    {
      width: `${size}px`,
      height: `${size}px`,
      marginRight: '3px',
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
