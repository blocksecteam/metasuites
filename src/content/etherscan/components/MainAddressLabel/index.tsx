import { type FC } from 'react'
import { Tooltip } from 'antd'

import { TokenSymbol } from '../../components'

interface Props {
  label: string
}

const MainAddressLabel: FC<Props> = ({ label }) => {
  return (
    <Tooltip
      title={
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfWk-74XOBL6sU7SgFRIuDzbFwaUt0wf7C4KE8U_E5FUcboog/viewform?usp=pp_url&entry.1591633300=Bug/Label+Reports"
          target="_blank"
          rel="noreferrer"
        >
          Report
        </a>
      }
    >
      <div className="badge bg-success bg-opacity-10 border border-success border-opacity-25 text-green-600 text-nowrap rounded-pill py-1.5 px-2">
        <TokenSymbol />
        {label}
      </div>
    </Tooltip>
  )
}

export default MainAddressLabel
