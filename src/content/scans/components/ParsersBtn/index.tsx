import { type FC } from 'react'
import { Space } from 'antd'

import {
  DEDAUB_SUPPORT_DIRECT_LIST,
  PHALCON_SUPPORT_LIST,
  TENDERLY_SUPPORT_LIST,
  OPENCHAIN_SUPPORT_LIST,
  TransactionParsers
} from '@common/constants'
import { getNodeValue } from '@common/utils'
import { useStore } from '@common/hooks'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'

import styles from './index.module.less'

interface Props {
  chain: string
}

const ParsersBtn: FC<Props> = ({ chain }) => {
  const txHash = getNodeValue(document.getElementById('spanTxHash'))
  const [alternativeParsers] = useStore('alternativeParsers')

  if (!txHash) return null

  const dedaubPathname = DEDAUB_SUPPORT_DIRECT_LIST.find(
    item => item.chain === chain
  )?.pathname
  const phalconPathname = PHALCON_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname
  const transactionViewerPathname = OPENCHAIN_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname
  const tenderlyPathname = TENDERLY_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname

  return (
    <div className={styles.quick2ParsersBtn}>
      <Space split={'|'}>
        {phalconPathname && (
          <a
            href={`${PHALCON_EXPLORER_DOMAIN}/tx/${phalconPathname}/${txHash}`}
            target="_blank"
          >
            Phalcon
          </a>
        )}
        {transactionViewerPathname &&
          alternativeParsers[TransactionParsers.OPENCHAIN.value()] && (
            <a
              href={`https://openchain.xyz/trace/${transactionViewerPathname}/${txHash}`}
              target="_blank"
            >
              OpenChain
            </a>
          )}
        {tenderlyPathname &&
          alternativeParsers[TransactionParsers.TENDERLY.value()] && (
            <a
              href={`https://dashboard.tenderly.co/tx/${tenderlyPathname}/${txHash}`}
              target="_blank"
            >
              Tenderly
            </a>
          )}
        {dedaubPathname &&
          alternativeParsers[TransactionParsers.DEDAUB.value()] && (
            <a
              href={`https://app.dedaub.com/${dedaubPathname}/tx/${txHash}`}
              target="_blank"
            >
              Dedaub
            </a>
          )}
      </Space>
    </div>
  )
}

export default ParsersBtn
