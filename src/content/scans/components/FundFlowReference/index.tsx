import { type FC, useState } from 'react'

import { getImageUrl } from '@common/utils'

import FundFlowGraph from '../FundFlowGraph'
import Button from '../Button'

interface Props {
  chain: string
  mainAddress: string
}

const FundFlowReference: FC<Props> = ({ chain, mainAddress }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        type="primary"
        icon={<img src={getImageUrl('fundflow')} alt="" />}
        onClick={() => setVisible(true)}
      >
        Fund Flow
      </Button>
      <FundFlowGraph
        visible={visible}
        chain={chain}
        mainAddress={mainAddress}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

export default FundFlowReference
