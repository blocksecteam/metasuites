import { type FC } from 'react'

import { getAddressUrl } from '@src/content/oklink/utils/dealUrl'
import styles from './index.module.less'

interface Props {
  implementLabel?: string
  implementAddress?: string
}

const Title: FC<Props> = ({ implementLabel, implementAddress }) => {
  return (
    <div className={styles.titleBox}>
      {implementLabel?.trim() && (
        <a
          className={styles.link}
          href={getAddressUrl({ address: implementAddress })}
        >
          {implementLabel}
        </a>
      )}
      <a
        target="_blank"
        className={styles.link}
        href="https://docs.google.com/forms/d/e/1FAIpQLSfWk-74XOBL6sU7SgFRIuDzbFwaUt0wf7C4KE8U_E5FUcboog/viewform?usp=pp_url&entry.1591633300=Bug/Label+Reports"
      >
        Report
      </a>
    </div>
  )
}

export default Title
