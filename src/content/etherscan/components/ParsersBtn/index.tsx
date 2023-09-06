import { type FC } from 'react'

import {
  DEDAUB_SUPPORT_DIRECT_LIST,
  PHALCON_SUPPORT_LIST,
  TENDERLY_SUPPORT_LIST,
  TRANSACTION_VIEWER_SUPPORT_LIST
} from '@common/constants'
import { getNodeValue } from '@common/utils'

import styles from './index.module.less'

interface Props {
  chain: string
}

const ParsersBtn: FC<Props> = ({ chain }) => {
  const txHash = getNodeValue(document.querySelector('#spanTxHash'))

  if (!txHash) return null

  const dedaubPathname = DEDAUB_SUPPORT_DIRECT_LIST.find(
    item => item.chain === chain
  )?.pathname
  const phalconPathname = PHALCON_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname
  const transactionViewerPathname = TRANSACTION_VIEWER_SUPPORT_LIST.find(
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
      {phalconPathname && transactionViewerPathname && (
        <span className={styles.divider}>|</span>
      )}
      {transactionViewerPathname && (
        <a
          href={`https://openchain.xyz/trace/${transactionViewerPathname}/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenChain
        </a>
      )}
      {transactionViewerPathname && tenderlyPathname && (
        <span className={styles.divider}>|</span>
      )}
      {tenderlyPathname && (
        <a
          href={`https://dashboard.tenderly.co/tx/${tenderlyPathname}/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tenderly
        </a>
      )}
      {dedaubPathname && (
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
