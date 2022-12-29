import { type FC } from 'react'

import { getImageUrl } from '@common/utils'

import styles from './index.module.less'

interface Props {
  label: string
}

const PhishAddressLabel: FC<Props> = ({ label }) => {
  return (
    <div className={styles.container}>
      <img src={getImageUrl('phish')} alt="" />
      <div>{label}</div>
    </div>
  )
}

export default PhishAddressLabel
