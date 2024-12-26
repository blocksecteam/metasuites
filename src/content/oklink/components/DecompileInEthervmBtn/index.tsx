import { type FC } from 'react'

import { ETHERVM_SUPPORT_DIRECT_LIST } from '@common/constants'
import { getImageUrl } from '@common/utils'
import styles from './index.module.less'
import OKLinkImage from '../OKLinkImage'

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
    <div
      className={styles.wrapper}
      onClick={toEthervm}
    >
      <OKLinkImage className={styles.img} src={getImageUrl('ethervm')} />
      Decompile in ethervm.io
    </div>
  )
}

export default DecompileInEthervmBtn
