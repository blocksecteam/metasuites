import React, { type FC, type PropsWithChildren } from 'react'

import { openInternalPage } from '@common/utils'

import styles from './index.module.less'
import { version } from '../../../../package.json'

const Brand: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>{children}</div>
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

export default Brand
