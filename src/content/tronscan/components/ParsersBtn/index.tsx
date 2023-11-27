import React, { type FC } from 'react'
import { Button, ConfigProvider } from 'antd'

import { SLEUTH_DOMAIN } from '@common/config/uri'

interface Props {
  txHash: string
}

const ParsersBtn: FC<Props> = ({ txHash }) => {
  return (
    <a href={`${SLEUTH_DOMAIN}/result/tron/${txHash}`} target="_blank">
      <ConfigProvider
        prefixCls="metadock"
        theme={{
          token: {
            colorPrimary: '#00A54C',
            controlOutlineWidth: 0
          }
        }}
      >
        <Button
          type="primary"
          className="align-center"
          icon={
            <img
              className="mr-1"
              style={{ width: '18px' }}
              src="https://assets.blocksec.com/image/1677135239463-4.png"
              alt=""
            />
          }
        >
          View Fund Flow
        </Button>
      </ConfigProvider>
    </a>
  )
}

export default ParsersBtn
