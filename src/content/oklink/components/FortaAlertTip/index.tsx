import { type FC } from 'react'

import styles from './index.module.less'
import OKLinkImage from '../OKLinkImage'
import { getOKLinkImage } from '../../utils'
import Link from '../Link'

interface Props {
  alertUrl: string
  subscribeUrl: string
}

const FortaAlertTip: FC<Props> = ({ alertUrl, subscribeUrl }) => {
  return (
    <div className={styles.fortaAlertTip}>
      <OKLinkImage className={styles.logo} src={getOKLinkImage('warning')} />
      <span className={styles.desc}>Forta Alert:This is a suspicious exploit transaction</span>
      {alertUrl && (
        <Link className={styles.link} href={alertUrl}>
          Detail
        </Link>
      )}
      {alertUrl && subscribeUrl && <span className={styles.line} />}
      {subscribeUrl && (
        <Link className={styles.link} href={subscribeUrl}>
          Subscribe
        </Link>
      )}
    </div>
  )
}

export default FortaAlertTip
