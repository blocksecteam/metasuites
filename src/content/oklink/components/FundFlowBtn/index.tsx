import { type FC, useState } from 'react'

import { ModalFundFlow } from '@common/components'
import styles from './index.module.less'
import { getOKLinkImage } from '../../utils'
import GLOBAL from '../../constant/global'

interface Props {
  chain: string
  mainAddress: string
}

const FundFlowBtn: FC<Props> = ({ chain, mainAddress }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div className={styles.fundFlowBtn} onClick={() => setVisible(true)}>
        Fund Flow
        <img className={styles.iconRisk} src={getOKLinkImage('graph')} alt="" />
      </div>
      <ModalFundFlow
        formatNodeUrl={node => {
          const { url } = node
          const urlObj = new URL(url)
          const { pathname, search } = urlObj
          const formatUrl = `${GLOBAL.prefixPath}${pathname}${search}`
          return formatUrl
        }}
        visible={visible}
        chain={chain}
        mainAddress={mainAddress}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

export default FundFlowBtn
