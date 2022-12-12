import React, { type FC } from 'react'
import { useTranslation } from 'react-i18next'

import { openInternalPage } from '@common/utils'

import styles from './index.module.less'
import { version } from '../../../../package.json'

const Footer: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <div className={styles.policy}>
        <a href="#" onClick={() => openInternalPage('PrivacyPolicy')}>
          {t('settings.privacyPolicy')}
        </a>
        <div className={styles.divider} />
        <a
          href="https://forms.gle/7Q2E9KUhTG1xjS878"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('settings.feedback')}
        </a>
      </div>
      <div className={styles.brand}>
        <span className={styles.copy}>@2022 BlockSec</span>
        <span>Version {version}</span>
      </div>
    </div>
  )
}

export default Footer
