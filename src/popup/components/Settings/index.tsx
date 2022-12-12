import React, { useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Cell, Switch, Drawer, Checkbox } from '@common/components'
import { useStore } from '@common/hooks'
import type { OptKeys, OptWebsite } from '@src/store'
import { REFRESH } from '@common/constants'
import { chromeEvent } from '@common/event'
import { unique } from '@common/utils/array'
import { getImageUrl } from '@common/utils'

import styles from './index.module.less'

const Settings: FC = () => {
  const { t } = useTranslation()

  const [options, setOptions] = useStore('options')

  const [webVisible, setWebVisible] = useState(false)

  const onChange = (key: OptKeys, value: unknown, refresh = true) => {
    setOptions({
      ...options,
      [key]: value
    })
    if (refresh) onRefresh()
  }

  const onWebsitesChange = (opt: OptWebsite, value: boolean) => {
    const newWebOpt: OptWebsite[] = (
      options.supportWebList as OptWebsite[]
    ).map(item => {
      return {
        ...item,
        enabled: opt.name === item.name ? value : item.enabled
      }
    })
    setOptions({
      ...options,
      supportWebList: newWebOpt
    })
    onRefresh()
  }

  const onRefresh = () => {
    chromeEvent.emit(REFRESH, true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 🏷 why not list render? Chrome store break the order of options */}
        <Cell.Group>
          <Cell
            title={t('settings.websites')}
            onClick={() => setWebVisible(true)}
          />
          <Cell
            title={t('settings.fundFlow')}
            action={
              <Switch
                checked={options.fundFlow as boolean}
                onChange={val => onChange('fundFlow', val)}
              />
            }
          />
          <Cell
            title={t('settings.enhancedSignatures')}
            action={
              <Switch
                checked={options.enhancedSignatures as boolean}
                onChange={val => onChange('enhancedSignatures', val)}
              />
            }
          />
          <Cell
            title={t('settings.complianceScores')}
            action={
              <Switch
                checked={options.complianceScores as boolean}
                onChange={val => onChange('complianceScores', val)}
              />
            }
          />
          <Cell
            title={t('settings.enhancedLabels')}
            action={
              <Switch
                checked={options.enhancedLabels as boolean}
                onChange={val => onChange('enhancedLabels', val)}
              />
            }
          />
          <Cell
            title={t('settings.quick2Parsers')}
            action={
              <Switch
                checked={options.quick2Parsers as boolean}
                onChange={val => onChange('quick2Parsers', val)}
              />
            }
          />
          <Cell
            title={t('settings.contractSourcecode')}
            action={
              <Switch
                checked={options.contractSourcecode as boolean}
                onChange={val => onChange('contractSourcecode', val)}
              />
            }
          />
          <Cell
            title={t('settings.quick2debank')}
            action={
              <Switch
                checked={options.quick2debank as boolean}
                onChange={val => onChange('quick2debank', val)}
              />
            }
          />
          <Cell
            title={t('settings.decompileInDedaub')}
            action={
              <Switch
                checked={options.decompileInDedaub as boolean}
                onChange={val => onChange('decompileInDedaub', val)}
              />
            }
          />
          <Cell
            title={t('settings.utc2locale')}
            action={
              <Switch
                checked={options.utc2locale as boolean}
                onChange={val => onChange('utc2locale', val)}
              />
            }
          />
          <Cell
            border={false}
            title={t('settings.copyAddress')}
            action={
              <Switch
                checked={options.copyAddress as boolean}
                onChange={val => onChange('copyAddress', val)}
              />
            }
          />
        </Cell.Group>
      </div>
      <Drawer
        title={t('settings.websites')}
        visible={webVisible}
        onClose={() => setWebVisible(false)}
      >
        <div className={styles.websitesOptContainer}>
          <Cell.Group>
            {unique<OptWebsite>(
              options.supportWebList as OptWebsite[],
              'name'
            ).map(item => (
              <Cell
                pointer
                icon={getImageUrl(item.name)}
                key={item.name}
                border={false}
                title={item.name}
                desc={item.domains[0]}
                action={
                  <Checkbox
                    checked={item.enabled}
                    onChange={val => onWebsitesChange(item, val)}
                  />
                }
                onClick={() => onWebsitesChange(item, !item.enabled)}
              />
            ))}
          </Cell.Group>
        </div>
      </Drawer>
    </div>
  )
}

export default Settings
