import { type FC, useState } from 'react'
import { Button, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

import { getImageUrl } from '@common/utils'
import { ModalFundFlow, Image } from '@common/components'

interface Props {
  chain: string
  mainAddress: string
}

const FundFlowBtn: FC<Props> = ({ mainAddress, chain }) => {
  const [visible, setVisible] = useState(false)

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        prefixCls="metadock"
        theme={{
          token: {
            colorPrimary: '#E84142',
            controlHeight: 30
          }
        }}
      >
        <Button
          type="primary"
          icon={<Image src={getImageUrl('fundflow')} width={16} />}
          className="align-center"
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

export default FundFlowBtn
