import { type FC, useState } from 'react'
import { Button, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

import { ModalFundFlow, IconFundflow } from '@common/components'

import styles from './index.module.less'

interface Props {
  chain: string
  mainAddress: string
}

const FundFlowButton: FC<Props> = ({ chain, mainAddress }) => {
  const [visible, setVisible] = useState(false)

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        prefixCls="metadock"
        theme={{ token: { colorPrimary: '#0784C3', controlHeight: 28 } }}
      >
        <Button
          type="primary"
          icon={<IconFundflow size={20} />}
          className={styles.button}
          onClick={() => setVisible(true)}
        >
          Fund Flow
        </Button>
      </ConfigProvider>
      <ModalFundFlow
        visible={visible}
        chain={chain}
        mainAddress={mainAddress}
        onClose={() => setVisible(false)}
      />
    </StyleProvider>
  )
}

export default FundFlowButton
