import { type FC } from 'react'

import { getImageUrl } from '@common/utils'
import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  logo?: string
}

const TokenSymbol: FC<Props> = ({ logo, style = {} }) => {
  return (
    <img
      style={{
        width: '14px',
        height: '14px',
        marginRight: '3px',
        verticalAlign: 'text-bottom',
        ...style
      }}
      src={logo || getImageUrl('default-token')}
      alt=""
    />
  )
}

export default TokenSymbol
