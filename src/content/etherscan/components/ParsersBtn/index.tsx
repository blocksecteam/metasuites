import { type FC } from 'react'
import { Space } from 'antd'

import { TransactionParsers } from '@common/constants'
import { ChainFeature } from '@common/config/chain-feature'
import { useStore } from '@common/hooks'
import { getNodeValue } from '@common/utils'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'

import styles from './index.module.less'

interface Props {
  chain: string
}

const ParsersBtn: FC<Props> = ({ chain }) => {
  const txHash = getNodeValue(document.querySelector('#spanTxHash'))
  const [alternativeParsers] = useStore('alternativeParsers')

  if (!txHash) return null

  const dedaubPathname = ChainFeature.metaOf('dedaub', chain)?.pathname
  const phalconPathname = ChainFeature.metaOf('phalcon', chain)?.pathname

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
        {ChainFeature.supports('tenderly', chain) &&
          alternativeParsers[TransactionParsers.TENDERLY.value()] && (
            <a
              href={`https://dashboard.tenderly.co/tx/${txHash}`}
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
