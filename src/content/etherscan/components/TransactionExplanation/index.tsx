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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
          Hide for this transaction
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div className={styles.dropdownItem} onClick={onDisable}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
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
        Transaction summary feature is turned off. You can always re-enable this
        feature in the settings.
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={cls(styles.btn, {
                      [styles.active]: liked
                    })}
                    onClick={onLike}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                )}
                {!liked && (
                  <svg
                    className={cls(styles.btn, {
                      [styles.active]: disliked
                    })}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={onDislike}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                    />
                  </svg>
                )}
                <Dropdown menu={{ items }}>
                  <span onClick={e => e.preventDefault()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={styles.btn}
                      style={{ marginLeft: 46 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>
                </Dropdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionExplanation
