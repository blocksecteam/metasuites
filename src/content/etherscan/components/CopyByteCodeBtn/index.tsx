import { type FC, useState } from 'react'
import cls from 'classnames'
import copy from 'copy-to-clipboard'

import styles from './index.module.less'

const CopyByteCodeBtn: FC = () => {
  const [copied, setCopied] = useState(false)
  const [codesView, setCodesView] = useState('bytecode')

  const onCopy = () => {
    const byteCode =
      document.querySelector('#dividcode > pre.wordwrap')?.innerHTML ?? ''
    copy(byteCode.replaceAll(/<br>/g, '\n'))
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const onMouseenter = () => {
    const _codesView =
      document
        .querySelector('#ContentPlaceHolder1_btnconvert222')
        ?.innerHTML?.indexOf('Opcodes') !== -1
        ? 'bytecode'
        : 'opcodes'
    setCodesView(_codesView)
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
        'mb-2'
      )}
      onClick={onCopy}
      onMouseEnter={onMouseenter}
    >
      {copied ? (
        <i className={cls('fa', 'fa-check', 'btn-icon__inner')} />
      ) : (
        <i className={cls('far', 'fa-copy', 'btn-icon__inner')} />
      )}
      <div className={styles.tooltip}>
        <div className={styles.inner}>
          {copied ? 'Copied' : `Copy ${codesView} to clipboard`}
        </div>
      </div>
    </a>
  )
}

export default CopyByteCodeBtn
