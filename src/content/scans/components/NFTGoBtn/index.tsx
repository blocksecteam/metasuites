import { type FC } from 'react'

import { getImageUrl } from '@common/utils'

import Button from '../Button'

interface Props {
  url: string
}

const NFTGoBtn: FC<Props> = ({ url }) => {
  return (
    <Button
      theme="#545EC0"
      fontColor="#FFFFFF"
      mr={10}
      onClick={() => window.open(url)}
      icon={<img src={getImageUrl('NFTGo')} alt="" />}
    >
      NFTGO
    </Button>
  )
}

export default NFTGoBtn
