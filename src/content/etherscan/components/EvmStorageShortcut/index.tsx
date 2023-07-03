import { type FC, useEffect, useState } from 'react'

import { chromeEvent } from '@common/event'
import { GET_CONSERVATIVE_BLOCK } from '@common/constants'
import { TokenSymbol } from '@common/components'

interface Props {
  chain: string
  address: string
}

const EvmStorageShortcut: FC<Props> = ({ chain, address }) => {
  const [blockHeight, setBlockHeight] = useState('')

  const onClick = () => {
    if (!blockHeight) return
    window.open(`https://evm.storage/eth/${blockHeight}/${address}`, '_blank')
  }

  useEffect(() => {
    const getBlockHeight = async () => {
      const res = await chromeEvent.emit<
        typeof GET_CONSERVATIVE_BLOCK,
        { block: number }
      >(GET_CONSERVATIVE_BLOCK, chain)
      if (res?.success) {
        setBlockHeight(res.data.block.toString())
      }
    }
    getBlockHeight()
  }, [])

  return (
    <li
      className="nav-item snap-align-start"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <span className="nav-link">
        <TokenSymbol mr={4} />
        <span className="d-sm-inline-block">View in evm.storage</span>
      </span>
    </li>
  )
}

export default EvmStorageShortcut
