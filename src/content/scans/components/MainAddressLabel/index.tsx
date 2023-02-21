import { type FC } from 'react'

import { TokenSymbol } from '../../components'

interface Props {
  label: string
}

const MainAddressLabel: FC<Props> = ({ label }) => {
  return (
    <div className="u-label u-label--xs u-label--info">
      <TokenSymbol />
      {label}
    </div>
  )
}

export default MainAddressLabel
