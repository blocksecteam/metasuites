import { type FC, useState } from 'react'
import cls from 'classnames'
import copy from 'copy-to-clipboard'

import styles from './index.module.less'

const CopyByteCodeBtn: FC = () => {
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    const byteCode = document.querySelector(
      '#dividcode > pre.wordwrap'
    )?.innerHTML
    if (byteCode) copy(byteCode)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <a
      className={cls(
        styles.copyByteCodeBtn,
        'js-clipboard',
        'btn',
        'btn-sm',
        'btn-icon',
        'btn-secondary',
        'mb-1',
        'ml-1'
      )}
      onClick={onCopy}
    >
      {copied ? (
        <i className={cls('fa', 'fa-check', 'btn-icon__inner')} />
      ) : (
        <i className={cls('far', 'fa-copy', 'btn-icon__inner')} />
      )}
      <div className={styles.tooltip}>
        <div className={styles.inner}>
          {copied ? 'Copied' : 'Copy bytecode to clipboard'}
        </div>
      </div>
    </a>
  )
}

export default CopyByteCodeBtn
