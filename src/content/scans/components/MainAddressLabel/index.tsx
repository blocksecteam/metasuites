import { Tooltip } from 'antd'
import { type FC } from 'react'

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
          rel="noreferrer"
        >
          Report
        </a>
      }
    >
      <div className="u-label u-label--xs u-label--info">
        <TokenSymbol />
        {label}
        {implementLabel && (
          <a
            href={`/address/${implementAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            {` ( ->`} <TokenSymbol logo={implementLogo} /> {implementLabel} )
          </a>
        )}
      </div>
    </Tooltip>
  )
}

export default MainAddressLabel
