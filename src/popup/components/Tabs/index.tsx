import React, { type FC } from 'react'
import cls from 'classnames'

import { getImageUrl } from '@common/utils'

import styles from './index.module.less'
import { TabKeys } from '../../constants'

const SHORTCUTS_ACTIVE_BG = getImageUrl('tab-bg-shortcuts')
const SETTINGS_ACTIVE_BG = getImageUrl('tab-bg-settings')

interface TabItemOption {
  label: keyof typeof TabKeys
  key: TabKeys
}

interface Props {
  active: TabKeys
  onChange: (key: TabKeys) => void
}

const Options: FC<Props> = ({ active, onChange }) => {
  const items: TabItemOption[] = [
    {
      label: 'Shortcuts',
      key: TabKeys.Shortcuts
    },
    {
      label: 'Settings',
      key: TabKeys.Settings
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src={
            active === TabKeys.Shortcuts
              ? SHORTCUTS_ACTIVE_BG
              : SETTINGS_ACTIVE_BG
          }
          className={styles.bgImg}
          alt=""
        />
        <div className={styles.inner}>
          {items.map(item => (
            <div
              key={item.key}
              onClick={() => onChange(item.key)}
              className={cls({ [styles.active]: active === item.key })}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Options
