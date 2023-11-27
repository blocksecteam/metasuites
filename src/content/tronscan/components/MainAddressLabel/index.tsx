import { type FC } from 'react'
import { Tooltip, ConfigProvider } from 'antd'

import type { AddressLabel } from '@common/api/types'
import { TokenSymbol } from '@common/components'

interface Props {
  data: AddressLabel
}

const MainAddressLabel: FC<Props> = ({
  data: { label, implementLabel, implementAddress, implementLogo }
}) => {
  return (
    <ConfigProvider prefixCls="metadock">
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
        <div className="address-tag info-tag d-flex align-items-center">
          <TokenSymbol />
          {label}
          {implementLabel?.trim() && (
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
    </ConfigProvider>
  )
}

export default MainAddressLabel
