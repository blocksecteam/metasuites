import { type FC } from 'react'

import { getImageUrl } from '@common/utils'

import Button from '../Button'

interface Props {
  mainAddress: string
}

const DeBankBtn: FC<Props> = ({ mainAddress }) => {
  const toDeBank = () => {
    window.open(`https://debank.com/profile/${mainAddress}`)
  }

  return (
    <Button
      theme="#f85f36"
      fontColor="#fff"
      mr={10}
      onClick={toDeBank}
      icon={<img src={getImageUrl('debank')} alt="" />}
    >
      DeBank
    </Button>
  )
}

export default DeBankBtn
