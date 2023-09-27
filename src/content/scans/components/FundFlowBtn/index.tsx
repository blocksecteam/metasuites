import { type FC, useState } from 'react'

import { getImageUrl } from '@common/utils'
import { ModalFundFlow } from '@common/components'

import Button from '../Button'

interface Props {
  chain: string
  mainAddress: string
}

const FundFlowBtn: FC<Props> = ({ chain, mainAddress }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        mr={10}
        type="primary"
        icon={<img src={getImageUrl('fundflow')} alt="" />}
        onClick={() => setVisible(true)}
      >
        Fund Flow
      </Button>
      <ModalFundFlow
        visible={visible}
        chain={chain}
        mainAddress={mainAddress}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

export default FundFlowBtn
