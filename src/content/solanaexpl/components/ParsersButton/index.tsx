import React, { type FC } from 'react'

import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { getChainSimpleName } from '@common/utils'
import { PHALCON_SUPPORT_LIST } from '@common/constants'
import { IconPhalcon } from '@common/components'

interface Props {
  txHash: string
}

const ParsersBtn: FC<Props> = ({ txHash }) => {
  const chain = getChainSimpleName()

  const pathname = PHALCON_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault()
    window.open(`${PHALCON_EXPLORER_DOMAIN}/tx/${pathname}/${txHash}`, '_blank')
  }

  if (!chain) return null
  return (
    <IconPhalcon
      mode="dark"
      style={{ verticalAlign: 'sub' }}
      onClick={handleClick}
    />
  )
}

export default ParsersBtn
