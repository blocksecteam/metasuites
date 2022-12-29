import React, { useState, type FC } from 'react'

import { Cell } from '@common/components'
import { useStore } from '@common/hooks'
import type { OptKeys, OptWebsite } from '@src/store'
import { REFRESH } from '@common/constants'
import { chromeEvent } from '@common/event'

import {
  SupportWebsitesDrawer,
  ConfigNFTDrawer,
  ConfigExploresDrawer
} from './components'
import styles from './index.module.less'

const Settings: FC = () => {
  const [options, setOptions] = useStore('options')

  const [configSupportWebVisible, setConfigSupportWebVisible] = useState(false)
  const [configExploresVisible, setConfigExploresVisible] = useState(false)
  const [configNFTVisible, setConfigNFTVisible] = useState(false)

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

  const onChange = (key: OptKeys, value: unknown, refresh = true) => {
    setOptions({
      ...options,
      [key]: value
    })
    if (refresh) onRefresh()
  }

  const onRefresh = () => {
    chromeEvent.emit(REFRESH, true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Cell.Group>
          <Cell
            title="Supported Websites List"
            onClick={() => setConfigSupportWebVisible(true)}
          />
          <Cell
            title="Customize your blockchain explorer enhancement"
            onClick={() => setConfigExploresVisible(true)}
          />
          <Cell
            border={false}
            title="Personalize your NFT marketplace upgrades"
            onClick={() => setConfigNFTVisible(true)}
          />
        </Cell.Group>
      </div>
      <SupportWebsitesDrawer
        visible={configSupportWebVisible}
        onClose={() => setConfigSupportWebVisible(false)}
        onChange={onWebsitesChange}
      />
      <ConfigExploresDrawer
        visible={configExploresVisible}
        onClose={() => setConfigExploresVisible(false)}
        onChange={onChange}
      />
      <ConfigNFTDrawer
        visible={configNFTVisible}
        onClose={() => setConfigNFTVisible(false)}
        onChange={onChange}
      />
    </div>
  )
}

export default Settings
