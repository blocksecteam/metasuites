import { type FC } from 'react'

import type { PostAddressParams } from '@common/api/types'
import { BASE_URL } from '@common/config/uri'
import { DownloadIcon } from '@common/components'

import Button from '../Button'

const QuickViewSourceCodeBtn: FC<PostAddressParams> = ({ chain, address }) => {
  let scan_type = "etherscan"
  if (chain == "eth") {
    scan_type = "etherscan"
  } else if (chain == "bsc") {
    scan_type = "bscscan"
  } else if (chain == "polygon") {
    scan_type = "polygonscan"
  } else if (chain == "fantom") {
    scan_type = "ftmscan"
  } else if (chain == "optimism") {
    scan_type == "optimistic.etherscan"
  } else if (chain == "arbitrum") {
    scan_type == "arbiscan"
  }
  let url = `https://${scan_type}.deth.net/address/${address}`
  return (
    <Button
      href={
        url
      }
      type="secondary"
    >
      <DownloadIcon size={12} mr={4} color="#fff" />
      View in deth.net
    </Button>
  )
}

export default QuickViewSourceCodeBtn
