import { type FC } from 'react'
import { Button, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

import { getImageUrl } from '@common/utils'
import { Image } from '@common/components'

interface Props {
  mainAddress: string
}

const DeBankBtn: FC<Props> = ({ mainAddress }) => {
  const toDeBank = () => {
    window.open(`https://debank.com/profile/${mainAddress}`)
  }

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        prefixCls="metadock"
        theme={{
          token: {
            colorPrimary: '#f85f36',
            controlHeight: 30
          }
        }}
      >
        <Button
          type="primary"
          icon={<Image src={getImageUrl('debank')} width={16} />}
          className="align-center"
          onClick={toDeBank}
        >
          DeBank
        </Button>
      </ConfigProvider>
    </StyleProvider>
  )
}

export default DeBankBtn
