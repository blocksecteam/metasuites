import { Fragment, useMemo, type FC } from 'react'

import {
  TENDERLY_SUPPORT_LIST,
  OPENCHAIN_SUPPORT_LIST,
  TransactionParsers
} from '@common/constants'
import { useStore } from '@common/hooks'

import styles from './index.module.less'
import txPage from '../../constant/txPage'

interface Props {
  chain: string
}

const ParsersBtn: FC<Props> = ({ chain }) => {
  const [alternativeParsers] = useStore('alternativeParsers')
  const txHash = txPage.hash

  const openchainPathname = OPENCHAIN_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname
  const tenderlyPathname = TENDERLY_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname

  const list = useMemo(() => {
    const tempList = []
    if (
      openchainPathname &&
      alternativeParsers[TransactionParsers.OPENCHAIN.value()]
    ) {
      tempList.push({
        url: `https://openchain.xyz/trace/${openchainPathname}/${txHash}`,
        text: 'OpenChain'
      })
    }

    if (
      tenderlyPathname &&
      alternativeParsers[TransactionParsers.TENDERLY.value()]
    ) {
      tempList.push({
        url: `https://dashboard.tenderly.co/tx/${tenderlyPathname}/${txHash}`,
        text: 'Tenderly'
      })
    }
    return tempList
  }, [])

  if (!list.length) {
    return null
  }

  return (
    <>
      {list.map((item, index) => {
        return (
          <Fragment key={index}>
            <div className={styles.line} />
            <a href={item.url} target="_blank" className={styles.link}>
              {item.text}
            </a>
          </Fragment>
        )
      })}
    </>
  )
}

export default ParsersBtn
