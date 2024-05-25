import React, { type FC } from 'react'
import { ConfigProvider, Button } from 'antd'

import { IconX } from '@common/components'

import styles from './App.module.less'
import { Shortcuts, Brand, Settings } from './components'

const App: FC = () => {
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
        <Shortcuts />
        <Settings />
        <Brand>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#000',
                borderRadiusSM: 9999
              }
            }}
          >
            <Button
              ghost
              size="small"
              type="primary"
              className="md-flex items-center"
              onClick={() =>
                window.open('https://twitter.com/MetaDockTeam', '_blank')
              }
            >
              <IconX mr={4} />
              Follow Us
            </Button>
          </ConfigProvider>
        </Brand>
      </div>
    </ConfigProvider>
  )
}

export default App
