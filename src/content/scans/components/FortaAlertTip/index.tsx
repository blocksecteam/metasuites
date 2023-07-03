import { type FC } from 'react'

import styles from './index.module.less'

interface Props {
  alertUrl: string
  subscribeUrl: string
}

const FortaAlertTip: FC<Props> = ({ alertUrl, subscribeUrl }) => {
  return (
    <div className={styles.fortaAlertTip}>
      <img src="https://assets.blocksec.com/image/1677135239463-2.png" alt="" />
      <img src="https://assets.blocksec.com/image/1677135239463-3.png" alt="" />
      <span className={styles.label}>Forta Alert:</span>
      <span className={styles.desc}>
        This is a suspicious exploit transaction
      </span>
      {alertUrl && (
        <a href={alertUrl} target="_blank" rel="noreferrer">
          Detail
        </a>
      )}
      {alertUrl && subscribeUrl && <span className="mx-2">|</span>}
      {subscribeUrl && (
        <a href={subscribeUrl} rel="noreferrer" target="_blank">
          Subscribe
        </a>
      )}
    </div>
  )
}

export default FortaAlertTip
