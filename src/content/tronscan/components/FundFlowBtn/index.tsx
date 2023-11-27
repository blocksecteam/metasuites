import { type FC, useState } from 'react'
import { Button, ConfigProvider } from 'antd'

import { getImageUrl } from '@common/utils'
import { ModalFundFlow, Image } from '@common/components'

// import Button from '../Button'

interface Props {
  mainAddress: string
}

const FundFlowBtn: FC<Props> = ({ mainAddress }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <ConfigProvider
        prefixCls="metadock"
        theme={{
          token: {
            colorPrimary: '#c23631',
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
        chain="tron"
        mainAddress={mainAddress}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

export default FundFlowBtn
