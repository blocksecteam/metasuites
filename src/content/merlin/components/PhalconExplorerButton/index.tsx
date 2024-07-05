import { type FC } from 'react'
import { Button, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

import { IconExplorer } from '@common/components'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { PATTERN_EVM_TX_HASH } from '@common/constants'

import styles from './index.module.less'

const PhalconExplorerButton: FC = () => {
  const handleClick = () => {
    const txHash = window.location.href.match(PATTERN_EVM_TX_HASH)?.[0]
    window.open(`${PHALCON_EXPLORER_DOMAIN}/tx/merlin/${txHash}`, '_blank')
  }

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        prefixCls="metadock"
        theme={{
          token: {
            colorPrimary: '#2f8af5'
          }
        }}
      >
        <Button
          size="small"
          type="primary"
          icon={<IconExplorer color="white" />}
          onClick={handleClick}
          className={styles.button}
        >
          Phalcon Explorer
        </Button>
      </ConfigProvider>
    </StyleProvider>
  )
}

export default PhalconExplorerButton
