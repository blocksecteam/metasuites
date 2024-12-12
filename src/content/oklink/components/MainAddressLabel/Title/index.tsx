import { type FC } from 'react'

import { getAddressUrl } from '@src/content/oklink/utils/dealUrl'
import styles from './index.module.less'
import Link from '../../Link'

interface Props {
  implementLabel?: string
  implementAddress?: string
}

const Title: FC<Props> = ({ implementLabel, implementAddress }) => {
  return (
    <div className={styles.titleBox}>
      {implementLabel?.trim() && (
        <Link
          isBlack
          className={styles.link}
          href={getAddressUrl({ address: implementAddress })}
        >
          {implementLabel}
        </Link>
      )}
      <Link
        isBlack
        className={styles.link}
        href="https://docs.google.com/forms/d/e/1FAIpQLSfWk-74XOBL6sU7SgFRIuDzbFwaUt0wf7C4KE8U_E5FUcboog/viewform?usp=pp_url&entry.1591633300=Bug/Label+Reports"
      >
        Report
      </Link>
    </div>
  )
}

export default Title
