import { Tooltip } from 'antd'
import { type FC } from 'react'

import type { AddressLabel } from '@common/api/types'
import { TokenSymbol } from '@common/components'
import { ChainType } from '@common/constants'

import styles from './index.module.less'
import { MainPrivateLabel } from '../../components'

interface Props {
  address: string
  label?: AddressLabel
}

const MainAddressLabel: FC<Props> = ({ label, address }) => {
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
          <div className={styles.container}>
            <TokenSymbol />
            {label.label}
          </div>
        </Tooltip>
      )}
      <MainPrivateLabel chainType={ChainType.SOLANA} address={address} />
    </>
  )
}

export default MainAddressLabel
