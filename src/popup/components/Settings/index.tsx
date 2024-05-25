import React, { useState, type FC } from 'react'

import { Cell } from '@common/components'
import { useStore } from '@common/hooks'
import type { OptKeys, OptWebsite } from '@src/store'
import { REFRESH } from '@common/constants'
import { chromeEvent } from '@common/event'

import {
  SupportWebsiteDrawer,
  ConfigNFTDrawer,
  ConfigExploresDrawer,
  PrivateLabelManagementDrawer
} from './components'
import styles from './index.module.less'

const Settings: FC = () => {
  const [options, setOptions] = useStore('options')
  const [supportWebList, setSupportWebList] = useStore('supportWebList')
  const [alternativeParsers, setAlternativeParsers] =
    useStore('alternativeParsers')

  const [configSupportWebVisible, setConfigSupportWebVisible] = useState(false)
  const [configExploresVisible, setConfigExploresVisible] = useState(false)
  const [configNFTVisible, setConfigNFTVisible] = useState(false)
  const [privateLabelManagementVisible, setPrivateLabelManagementVisible] =
    useState(false)

  const onWebsiteChange = (opt: OptWebsite, value: boolean) => {
    const newWebOpt = { ...supportWebList }
    for (const key in newWebOpt) {
      if (key === opt.name) {
        newWebOpt[key].enabled = value
      }
    }
    setSupportWebList(newWebOpt)
    onRefresh()
  }

  const onSwitchChange = (key: OptKeys, value: boolean, refresh = true) => {
    setOptions({
      ...options,
      [key]: value
    })
    if (refresh) onRefresh()
  }

  const onAlternativeParsersChange = (parser: string, enabled: boolean) => {
    setAlternativeParsers({
      ...alternativeParsers,
      [parser]: enabled
    })
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
            title="Personalize your NFT marketplace upgrades"
            onClick={() => setConfigNFTVisible(true)}
          />
          <Cell
            border={false}
            title="Local Private Label"
            onClick={() => setPrivateLabelManagementVisible(true)}
          />
        </Cell.Group>
      </div>
      <SupportWebsiteDrawer
        visible={configSupportWebVisible}
        onClose={() => setConfigSupportWebVisible(false)}
        onChange={onWebsiteChange}
      />
      <ConfigExploresDrawer
        visible={configExploresVisible}
        onClose={() => setConfigExploresVisible(false)}
        onSwitchChange={onSwitchChange}
        onAlternativeParsersChange={onAlternativeParsersChange}
      />
      <ConfigNFTDrawer
        visible={configNFTVisible}
        onClose={() => setConfigNFTVisible(false)}
        onSwitchChange={onSwitchChange}
      />
      <PrivateLabelManagementDrawer
        visible={privateLabelManagementVisible}
        onClose={() => setPrivateLabelManagementVisible(false)}
      />
    </div>
  )
}

export default Settings
