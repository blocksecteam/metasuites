import { type FC, useState, useEffect } from 'react'
import cls from 'classnames'

import { TokenSymbol } from '@src/content/scans/components'
import { LoadingOutlined, RefreshIcon } from '@src/common/components'
import type { GptTxExplainRes } from '@common/api/types'
import { chromeEvent } from '@common/event'
import {
  GET_GPT_TX_EXPLAIN,
  TransactionSummaryType,
  MARK_GPT_TX_EXPLAIN
} from '@common/constants'

import styles from './index.module.less'

interface Props {
  txHash: string
}

const TransactionExplanation: FC<Props> = ({ txHash }) => {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<GptTxExplainRes>()
  const [typing, setTyping] = useState(false)
  const [innerText, setInnerText] = useState('')
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [txType, setTxType] = useState<TransactionSummaryType>()

  const requestData = async () => {
    setLoading(true)
    const res = await chromeEvent.emit<
      typeof GET_GPT_TX_EXPLAIN,
      GptTxExplainRes
    >(GET_GPT_TX_EXPLAIN, txHash)
    setLoading(false)
    if (res?.success) {
      setResult(res.data)
      setTxType(res.data.type)
    }
  }

  const onRegenerate = () => {
    setTimeout(() => {
      setResult(undefined)
      setLiked(false)
      setDisliked(false)
      requestData()
    }, 500)
  }

  const onLike = async () => {
    if (liked) return
    setLiked(true)
    chromeEvent.emit<typeof MARK_GPT_TX_EXPLAIN>(MARK_GPT_TX_EXPLAIN, {
      tx: txHash,
      template: result!.template,
      score: 1
    })
  }

  const onDislike = () => {
    if (disliked) return
    setDisliked(true)
    chromeEvent.emit<typeof MARK_GPT_TX_EXPLAIN>(MARK_GPT_TX_EXPLAIN, {
      tx: txHash,
      template: result!.template,
      score: -1
    })
  }

  useEffect(() => {
    if (txHash) {
      requestData()
    }
  }, [txHash])

  useEffect(() => {
    if (result) {
      setLoading(false)
      setInnerText('')
      setTyping(true)
      const chars = result.content.split('')
      let i = 0
      const interval = setInterval(function () {
        if (i >= chars.length) {
          clearInterval(interval)
          setTyping(false)
        } else {
          setInnerText(v => {
            const value = v + chars[i]
            i++
            return value
          })
        }
      }, 25)
    }
  }, [result])

  return (
    <div
      className={cls(
        styles.transactionExplanation,
        'p-5 bg-success bg-opacity-10 border border-success border-opacity-25 text-green-600'
      )}
    >
      <div className="row">
        <div className="col-md-3 text-green-600 mb-md-0">
          <TokenSymbol size={17} />
          Transaction Explanation:
        </div>
        <div className={cls('col-md-9', styles.content)}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <LoadingOutlined />
            </div>
          ) : (
            <>
              <TokenSymbol
                size={17}
                style={{ verticalAlign: 'sub' }}
                mr={6}
                logo="https://assets.blocksec.com/image/1681125752966-2.png"
              />
              <span>{innerText}</span>
              {!typing && (
                <>
                  {!disliked && (
                    <img
                      style={{ marginLeft: 28 }}
                      className={cls(styles.btn, {
                        [styles.active]: liked
                      })}
                      src="https://assets.blocksec.com/image/1680932127068-2.png"
                      alt=""
                      onClick={onLike}
                    />
                  )}
                  {!liked && (
                    <img
                      className={cls(styles.btn, {
                        [styles.active]: disliked
                      })}
                      src="https://assets.blocksec.com/image/1681182333273-2.png"
                      alt=""
                      onClick={onDislike}
                    />
                  )}
                  {txType === TransactionSummaryType.GPT && (
                    <RefreshIcon
                      size={12}
                      color="#00a186"
                      className={styles.btn}
                      onClick={onRegenerate}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionExplanation
