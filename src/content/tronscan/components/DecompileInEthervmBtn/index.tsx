import { type FC } from 'react'
import { Button, ConfigProvider } from 'antd'

import { ChainFeature } from '@common/config/chain-feature'
import { getImageUrl } from '@common/utils'
import { Image } from '@common/components'

interface Props {
  mainAddress: string
}

const DecompileInEthervmBtn: FC<Props> = ({ mainAddress }) => {
  const toEthervm = () => {
    const item = ChainFeature.metaOf('ethervm', 'tron')
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
        className="items-center md-flex"
        icon={<Image src={getImageUrl('ethervm')} width={16} />}
        onClick={toEthervm}
      >
        Decompile in ethervm.io
      </Button>
    </ConfigProvider>
  )
}

export default DecompileInEthervmBtn
