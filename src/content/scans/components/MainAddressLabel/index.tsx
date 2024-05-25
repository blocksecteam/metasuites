import { Tooltip } from 'antd'
import { type FC } from 'react'

import type { AddressLabel } from '@common/api/types'
import { classifyByChain } from '@common/utils'
import { TokenSymbol } from '@common/components'

import { MainPrivateLabel } from '../../components'

interface Props {
  label?: AddressLabel
  address: string
  chain: string
}

const MainAddressLabel: FC<Props> = ({ label, address, chain }) => {
  return (
    <>
      {label && (
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
          <div className="u-label u-label--xs u-label--info">
            <TokenSymbol />
            {label.label}
            {label.implementLabel && (
              <a href={`/address/${label.implementAddress}`} target="_blank">
                {` ( ->`} <TokenSymbol logo={label.implementLogo} />{' '}
                {label.implementLabel} )
              </a>
            )}
          </div>
        </Tooltip>
      )}
      <MainPrivateLabel address={address} chainType={classifyByChain(chain)} />
    </>
  )
}

export default MainAddressLabel
