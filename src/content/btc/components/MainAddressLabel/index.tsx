import { type FC } from 'react'

import styles from './index.module.less'

interface Props {
  label: string
}

const MainAddressLabel: FC<Props> = ({ label }) => {
  return <div className={styles.container}>{label}</div>
}

export default MainAddressLabel
