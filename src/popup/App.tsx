import React, { type FC, useState } from 'react'
import { ConfigProvider } from 'antd'

import styles from './App.module.less'
import { Tabs, Shortcuts, Brand, Settings, GitcoinAd } from './components'
import { TabKeys } from './constants'

const App: FC = () => {
  const [activeTab, setActiveTab] = useState(TabKeys.Shortcuts)

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00A54C',
          borderRadius: 8
        }
      }}
    >
      <div className={styles.container}>
        <Tabs active={activeTab} onChange={key => setActiveTab(key)} />
        {activeTab === TabKeys.Shortcuts ? <Shortcuts /> : <Settings />}
        <Brand />
        {activeTab === TabKeys.Shortcuts && <GitcoinAd />}
      </div>
    </ConfigProvider>
  )
}

export default App
