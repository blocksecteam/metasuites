import { type FC, useState } from 'react'
import { Button, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import cls from 'classnames'

import { ModalFundFlow, IconFundflow } from '@common/components'
import type { BaseComponent } from '@common/types'

import styles from './index.module.less'

interface Props extends BaseComponent {
  chain: string
  mainAddress: string
}

const FundFlowButton: FC<Props> = ({
  chain,
  mainAddress,
  className,
  style
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        prefixCls="metadock"
        theme={{ token: { colorPrimary: '#0784C3' } }}
      >
        <Button
          type="primary"
          icon={<IconFundflow size={20} />}
          style={style}
          className={cls(styles.button, className)}
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
