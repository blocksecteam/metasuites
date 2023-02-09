import { type FC } from 'react'

import { TokenSymbol } from '../../components'

interface Props {
  label: string
}

const MainAddressLabel: FC<Props> = ({ label }) => {
  return (
    <div className="badge bg-success bg-opacity-10 border border-success border-opacity-25 text-green-600 text-nowrap rounded-pill py-1.5 px-2">
      <TokenSymbol />
      {label}
    </div>
  )
}

export default MainAddressLabel
