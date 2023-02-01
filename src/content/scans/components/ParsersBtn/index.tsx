import { type FC } from 'react'

import {
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
  const txHash = getNodeValue(document.getElementById('spanTxHash'))

  if (!txHash) return null

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
          href={`https://phalcon.blocksec.com/tx/${phalconPathname}/${txHash}`}
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
          href={`https://tx.eth.samczsun.com/${transactionViewerPathname}/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Transaction Viewer
        </a>
      )}
      {tenderlyPathname && (
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
    </div>
  )
}

export default ParsersBtn
