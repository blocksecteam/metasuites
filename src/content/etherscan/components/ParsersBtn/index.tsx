import { type FC } from 'react'

import {
  DEDAUB_SUPPORT_DIRECT_LIST,
  PHALCON_SUPPORT_LIST,
  TENDERLY_SUPPORT_LIST,
  OPENCHAIN_SUPPORT_LIST,
  TransactionParsers
} from '@common/constants'
import { useStore } from '@common/hooks'
import { getNodeValue } from '@common/utils'

import styles from './index.module.less'

interface Props {
  chain: string
}

const ParsersBtn: FC<Props> = ({ chain }) => {
  const txHash = getNodeValue(document.querySelector('#spanTxHash'))
  const [alternativeParsers] = useStore('alternativeParsers')

  if (!txHash) return null

  const dedaubPathname = DEDAUB_SUPPORT_DIRECT_LIST.find(
    item => item.chain === chain
  )?.pathname
  const phalconPathname = PHALCON_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname
  const openchainPathname = OPENCHAIN_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname
  const tenderlyPathname = TENDERLY_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname

  return (
    <div className={styles.quick2ParsersBtn}>
      {phalconPathname && (
        <a
          href={`https://explorer.phalcon.xyz/tx/${phalconPathname}/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Phalcon
        </a>
      )}
      {openchainPathname &&
        alternativeParsers[TransactionParsers.OPENCHAIN.value()] && (
          <>
            <span className={styles.divider}>|</span>
            <a
              href={`https://openchain.xyz/trace/${openchainPathname}/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenChain
            </a>
          </>
        )}
      {tenderlyPathname &&
        alternativeParsers[TransactionParsers.TENDERLY.value()] && (
          <>
            <span className={styles.divider}>|</span>
            <a
              href={`https://dashboard.tenderly.co/tx/${tenderlyPathname}/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tenderly
            </a>
          </>
        )}
      {dedaubPathname &&
        alternativeParsers[TransactionParsers.DEDAUB.value()] && (
          <>
            <span className={styles.divider}>|</span>
            <a
              href={`https://library.dedaub.com/${dedaubPathname}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Dedaub
            </a>
          </>
        )}
    </div>
  )
}

export default ParsersBtn
