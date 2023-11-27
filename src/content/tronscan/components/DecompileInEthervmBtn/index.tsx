import { type FC } from 'react'
import { Button, ConfigProvider } from 'antd'

import { ETHERVM_SUPPORT_DIRECT_LIST } from '@common/constants'
import { getImageUrl } from '@common/utils'
import { Image } from '@common/components'

interface Props {
  mainAddress: string
}

const DecompileInEthervmBtn: FC<Props> = ({ mainAddress }) => {
  const toEthervm = () => {
    const item = ETHERVM_SUPPORT_DIRECT_LIST.find(i => i.chain === 'tron')
    if (item) {
      window.open(`${item.url}/${mainAddress}`)
    } else {
      window.open('https://ethervm.io/decompile')
    }
  }

  return (
    <ConfigProvider
      prefixCls="metadock"
      theme={{
        token: { colorPrimary: '#101010' },
        components: {
          Button: { fontWeight: 600, fontSize: 12, controlOutlineWidth: 0 }
        }
      }}
    >
      <Button
        size="small"
        type="primary"
        className="align-center"
        icon={<Image src={getImageUrl('ethervm')} width={16} />}
        onClick={toEthervm}
      >
        Decompile in ethervm.io
      </Button>
    </ConfigProvider>
  )
}

export default DecompileInEthervmBtn
