import { type FC } from 'react'

interface Props {
  label: string
}

const MainAddressLabel: FC<Props> = ({ label }) => {
  return <div className="u-label u-label--xs u-label--info">{label}</div>
}

export default MainAddressLabel
