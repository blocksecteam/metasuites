import { type FC, useEffect, useState } from 'react'

import { chromeEvent } from '@common/event'
import { GET_CONSERVATIVE_BLOCK } from '@common/constants'
import { TokenSymbol } from '@common/components'
import styles from './index.module.less'
import Link from '../Link'

interface Props {
  chain: string
  address: string
}

const EvmStorageShortcut: FC<Props> = ({ chain, address }) => {
  const [blockHeight, setBlockHeight] = useState('')

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

  if (!blockHeight) {
    return null
  }

  return (
    <Link
      className={styles.wrapper}
      href={`https://evm.storage/eth/${blockHeight}/${address}`}
    >
      <TokenSymbol mr={4} />
      <span>View in evm.storage</span>
    </Link>
  )
}

export default EvmStorageShortcut
