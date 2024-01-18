import React, { type FC } from 'react'

import { openInternalPage } from '@common/utils'

import styles from './index.module.less'
import { version } from '../../../../package.json'

const Footer: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.policy}>
        <a href="#" onClick={() => openInternalPage('PrivacyPolicy')}>
          Privacy Policy
        </a>
        <div className={styles.divider} />
        <a href="https://forms.gle/7Q2E9KUhTG1xjS878" target="_blank">
          Feedback
        </a>
      </div>
      <div className={styles.brand}>
        <span className={styles.copy}>
          @{new Date().getFullYear()} BlockSec
        </span>
        <span>Version {version}</span>
      </div>
    </div>
  )
}

export default Footer
