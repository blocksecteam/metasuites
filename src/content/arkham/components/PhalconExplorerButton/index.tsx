import React, { type FC } from 'react'

import { IconPhalcon } from '@common/components'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { PATTERN_EVM_TX_HASH } from '@common/constants'

interface Props {
  chain: string
}

const PhalconExplorerButton: FC<Props> = ({ chain }) => {
  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault()
    const txHash = window.location.href.match(PATTERN_EVM_TX_HASH)?.[0]

    window.open(`${PHALCON_EXPLORER_DOMAIN}/tx/${chain}/${txHash}`, '_blank')
  }

  return <IconPhalcon mode="dark" onClick={handleClick} />
}

export default PhalconExplorerButton
