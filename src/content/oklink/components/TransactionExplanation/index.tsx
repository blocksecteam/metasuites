import classNames from 'classnames'
import { type FC, useState, useEffect } from 'react'

import type { GptTxExplainRes } from '@common/api/types'
import { chromeEvent } from '@common/event'
import { GET_GPT_TX_EXPLAIN } from '@common/constants'
import { useStore } from '@common/hooks'

import styles from './index.module.less'
import Edit from './Edit'
import Result from './Result'
import LoadingLogo from './LoadingLogo'
import Label from './Label'

interface Props {
  tx: string
  chain: string
  clearTimer?: () => void
}

const TransactionExplanation: FC<Props> = ({ clearTimer, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<GptTxExplainRes>()
  const [mounted, setMounted] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [errorOccur, setErrorOccur] = useState(false)

  const [options] = useStore('options')

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
    }
  }

  useEffect(() => {
    if (result) {
      setMounted(true)
    }
  }, [result])

  useEffect(() => {
    requestData()
  }, [])

  return (
    <div
      className={classNames(styles.transactionExplanation, {
        [styles.hidden]: !options.txSummary || hidden
      })}
    >
      <Label mounted={mounted} />
      <div className={styles.content}>
        {/* <LoadingLogo loading={loading} /> */}
        {<Result result={result} />}
      </div>
      {!loading && (
        <Edit
          result={result}
          errorOccur={errorOccur}
          onHidden={() => {
            clearTimer?.()
            setHidden(true)
          }}
          {...props}
        />
      )}
    </div>
  )
}

export default TransactionExplanation
