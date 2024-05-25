import { type FC } from 'react'

import { ChainType } from '@common/constants'
import type { AddressLabel } from '@common/api/types'

import styles from './index.module.less'
import { MainPrivateLabel } from '../../components'

interface Props {
  label?: AddressLabel
  address: string
}

const MainAddressLabel: FC<Props> = ({ label, address }) => {
  return (
    <div className={styles.container}>
      {label && <div className={styles.label}>{label.label}</div>}
      <MainPrivateLabel chainType={ChainType.BTC} address={address} />
    </div>
  )
}

export default MainAddressLabel
