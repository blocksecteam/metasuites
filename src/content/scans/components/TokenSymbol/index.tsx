import { type FC } from 'react'

import { getImageUrl } from '@common/utils'

interface Props {
  logo?: string
}

const TokenSymbol: FC<Props> = ({ logo }) => {
  return (
    <img
      style={{
        width: '14px',
        height: '14px',
        marginRight: '3px',
        verticalAlign: 'text-bottom'
      }}
      src={logo || getImageUrl('default-token')}
      alt=""
    />
  )
}

export default TokenSymbol
