import { type FC } from 'react'
import { Tooltip } from 'antd'

import type { AddressLabel } from '@common/api/types'
import { TokenSymbol } from '@common/components'

interface Props {
  data: AddressLabel
}

const MainAddressLabel: FC<Props> = ({
  data: { label, implementLabel, implementAddress, implementLogo }
}) => {
  return (
    <Tooltip
      title={
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfWk-74XOBL6sU7SgFRIuDzbFwaUt0wf7C4KE8U_E5FUcboog/viewform?usp=pp_url&entry.1591633300=Bug/Label+Reports"
          target="_blank"
        >
          Report
        </a>
      }
    >
      <div
        style={{ height: 24.88 }}
        className="badge bg-success bg-opacity-10 border border-success border-opacity-25 text-green-600 text-nowrap rounded-pill py-1.5 px-2"
      >
        <TokenSymbol size={10.88} />
        {label}
        {implementLabel?.trim() && (
          <a href={`/address/${implementAddress}`} target="_blank">
            {` ( ->`} <TokenSymbol size={10.88} logo={implementLogo} />{' '}
            {implementLabel} )
          </a>
        )}
      </div>
    </Tooltip>
  )
}

export default MainAddressLabel
