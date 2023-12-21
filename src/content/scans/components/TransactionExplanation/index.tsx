import cls from 'classnames'
import { Dropdown, type MenuProps } from 'antd'
import React, { type FC, useState, useEffect } from 'react'
import isMobile from 'is-mobile'

import { CopyButton, TokenSymbol } from '@common/components'
import type { GptTxExplainRes } from '@common/api/types'
import { chromeEvent } from '@common/event'
import { MARK_GPT_TX_EXPLAIN, GET_GPT_TX_EXPLAIN } from '@common/constants'
import { useStore } from '@common/hooks'

import styles from './index.module.less'

interface Props {
  tx: string
  chain: string
}

const TransactionExplanation: FC<Props> = props => {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<GptTxExplainRes>()
  const [mounted, setMounted] = useState(false)
  const [innerText, setInnerText] = useState('')
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [errorOccur, setErrorOccur] = useState(false)

  const [options, setOptions] = useStore('options')

  const requestData = async () => {
    setLoading(true)
    const res = await chromeEvent.emit<
      typeof GET_GPT_TX_EXPLAIN,
      GptTxExplainRes
    >(GET_GPT_TX_EXPLAIN, props)
    setLoading(false)
    if (res?.success) {
      setResult(res.data)
    } else {
      setErrorOccur(true)
      setInnerText(res?.message ?? '')
    }
  }

  const onLike = async () => {
    if (liked) return
    setLiked(true)
    chromeEvent.emit<typeof MARK_GPT_TX_EXPLAIN>(MARK_GPT_TX_EXPLAIN, {
      ...props,
      template: result!.template,
      score: 1
    })
  }

  const onDislike = () => {
    if (disliked) return
    setDisliked(true)
    chromeEvent.emit<typeof MARK_GPT_TX_EXPLAIN>(MARK_GPT_TX_EXPLAIN, {
      ...props,
      template: result!.template,
      score: -1
    })
  }

  const onDisable = () => {
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      setOptions({
        ...options,
        txSummary: false
      })
    }, 2500)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className={styles.dropdownItem} onClick={() => setHidden(true)}>
          <img
            src="https://assets.blocksec.com/image/1684480373829-3.svg"
            alt=""
          />
          Hide for this transaction
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div className={styles.dropdownItem} onClick={onDisable}>
          <img
            src="https://assets.blocksec.com/image/1684480373829-2.svg"
            alt=""
          />
          Disable the feature
        </div>
      )
    }
  ]

  useEffect(() => {
    if (result) {
      setMounted(true)
      const chars = result.content.split('')
      let i = 0
      const interval = setInterval(function () {
        if (i >= chars.length) {
          clearInterval(interval)
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

  useEffect(() => {
    requestData()
  }, [])

  return (
    <>
      <div
        className={cls(styles.transactionExplanation, {
          [styles.hidden]: !options.txSummary || hidden
        })}
      >
        <div className={cls(styles.message, { [styles.show]: showMessage })}>
          <img
            src="https://assets.blocksec.com/image/1684488852891-2.svg"
            alt=""
          />
          Transaction summary feature is turned off. You can always re-enable
          this feature in the settings.
        </div>
        <div className="row">
          <div className="col-md-3 mb-md-0 text-dt">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://blocksec.com/metadock"
              style={{ display: 'contents' }}
            >
              <TokenSymbol
                size={17}
                className={cls(styles.mdLogo, { [styles.animation]: mounted })}
              />
            </a>
            Transaction Explanation:
          </div>
          <div
            className={cls('col-md-9', styles.content, {
              [styles.column]: isMobile()
            })}
          >
            <div className={styles.contentWrap}>
              <TokenSymbol
                className={cls(styles.gptLogo, { [styles.animation]: loading })}
                size={17}
                style={{ verticalAlign: 'sub' }}
                mr={6}
                logo="https://assets.blocksec.com/image/1681125752966-2.png"
              />
              <span>{innerText}</span>
            </div>
            {!loading && (
              <div className={styles.actionGroup}>
                <div className="align-center">
                  {!errorOccur && (
                    <CopyButton size={14} mr={5} text={result?.content ?? ''} />
                  )}
                  {!disliked && (
                    <img
                      className={cls(styles.btn, {
                        [styles.active]: liked
                      })}
                      src="https://assets.blocksec.com/image/1684478165365-3.svg"
                      alt=""
                      onClick={onLike}
                    />
                  )}
                  {!liked && (
                    <img
                      className={cls(styles.btn, {
                        [styles.active]: disliked
                      })}
                      src="https://assets.blocksec.com/image/1684478165365-2.svg"
                      alt=""
                      onClick={onDislike}
                    />
                  )}
                  <Dropdown menu={{ items }}>
                    <a onClick={e => e.preventDefault()}>
                      <img
                        className={styles.btn}
                        style={{ marginLeft: 46 }}
                        src="https://assets.blocksec.com/image/1684479319437-2.svg"
                        alt=""
                      />
                    </a>
                  </Dropdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="hr-space my-4" />
    </>
  )
}

export default TransactionExplanation
