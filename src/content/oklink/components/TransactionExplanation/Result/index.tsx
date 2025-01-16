import { type FC, useState, useEffect, memo } from 'react'

import type { GptTxExplainRes } from '@common/api/types'

interface Props {
  result?: GptTxExplainRes
}

const Result: FC<Props> = ({ result }) => {
  const [innerText, setInnerText] = useState('')

  useEffect(() => {
    if (result) {
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

  return <span>{innerText}</span>
}

export default memo(Result)
