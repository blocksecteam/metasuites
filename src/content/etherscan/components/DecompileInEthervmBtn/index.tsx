import { type FC } from 'react'

import { ETHERVM_SUPPORT_DIRECT_LIST } from '@common/constants'
import { getImageUrl } from '@common/utils'

import Button from '../Button'

interface Props {
  mainAddress: string
  chain: string
}

const DecompileInEthervmBtn: FC<Props> = ({ mainAddress, chain }) => {
  const toEthervm = () => {
    const item = ETHERVM_SUPPORT_DIRECT_LIST.find(i => i.chain === chain)
    if (item) {
      window.open(`${item.url}/${mainAddress}`)
    } else {
      window.open('https://ethervm.io/decompile')
    }
  }

  return (
    <Button
      style={{ width: 'fit-content' }}
      fontColor="#fff"
      theme="#0F0F40"
      icon={<img src={getImageUrl('ethervm')} alt="" />}
      onClick={toEthervm}
    >
      Decompile in ethervm.io
    </Button>
  )
}

export default DecompileInEthervmBtn
