import React, {
  type FC,
  useState,
  type PropsWithChildren,
  type CSSProperties
} from 'react'
import copy from 'copy-to-clipboard'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'

import styles from './index.module.less'

interface Props extends BaseComponent {
  // eslint-disable-next-line @typescript-eslint/ban-types
  text?: string | Function
  size?: number
  ml?: number
  mr?: number
  hover?: boolean
  placement?: 'left' | 'right'
  theme?: string
}

const CopyButton: FC<PropsWithChildren<Props>> = ({
  theme,
  text = '',
  size = 16,
  ml,
  mr,
  className,
  style = {},
  placement = 'right',
  hover,
  children
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (val: string) => {
    copy(val)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const onCopy = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    if (copied) return
    if (typeof text === 'function') {
      const val = text()
      if (val instanceof Promise) {
        val.then(res => {
          copyToClipboard(res)
        })
      } else {
        copyToClipboard(val)
      }
    } else {
      copyToClipboard(text)
    }
  }

  const handleEventProxy = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (children) {
      onCopy(e)
    }
  }

  const isPureComponent = !children

  const iconContainerStyle: CSSProperties = Object.assign(
    {
      minWidth: `${size}px`,
      maxWidth: `${size}px`,
      minHeight: `${size}px`,
      maxHeight: `${size}px`,
      marginLeft: `${ml}px`,
      marginRight: `${mr}px`
    },
    isPureComponent ? style : {}
  )

  const _theme = theme
    ? theme
    : window.location.host.includes('etherscan')
    ? 'var(--bs-primary)'
    : 'var(--primary)'

  const containerStyle: CSSProperties = Object.assign(
    {
      display: !isPureComponent ? 'inline-block' : 'contents'
    },
    style
  )

  return (
    <div
      className={cls(
        styles.copyButton,
        { [styles.hoverShowIcon]: !isPureComponent && hover },
        { pointer: !isPureComponent },
        className
      )}
      style={containerStyle}
      onClick={handleEventProxy}
    >
      {placement === 'right' && children}
      <div
        className={cls(styles.iconContainer, isPureComponent && className, {
          [styles.copied]: copied
        })}
        style={iconContainerStyle}
      >
        <svg
          className={styles.iconCopy}
          // @ts-ignore
          t="1669358941076"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1754"
          width={size}
          height={size}
          // @ts-ignore
          onClick={onCopy}
        >
          <path
            fill={_theme}
            d="M832 64H296a8 8 0 0 0-8 8V128c0 4.416 3.584 8 8 8h496v688c0 4.416 3.584 8 8 8h56a8 8 0 0 0 8-8V96A32 32 0 0 0 832 64z m-128 128H192a32 32 0 0 0-32 32v530.688a32 32 0 0 0 9.408 22.592l173.312 173.312a33.088 33.088 0 0 0 7.36 5.504v1.92h4.224c3.52 1.28 7.168 1.984 11.008 1.984H704a32 32 0 0 0 32-32v-704A32 32 0 0 0 704 192zM382.016 896h-0.192l-149.824-149.76v-0.256h150.016V896z"
            p-id="1755"
          />
        </svg>

        <svg
          className={styles.iconSuccess}
          // @ts-ignore
          t="1669359261894"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1900"
          width={size}
          height={size}
        >
          <path
            fill={_theme}
            d="M512 64a448 448 0 1 0 0 896A448 448 0 0 0 512 64z m193.472 301.696l-210.56 292.032a31.808 31.808 0 0 1-51.712 0l-124.672-172.8a8 8 0 0 1 6.464-12.736h46.912c10.24 0 19.84 4.928 25.92 13.312L468.992 584.32l157.184-218.048a32 32 0 0 1 25.92-13.248h46.912c6.464 0 10.24 7.36 6.464 12.672z"
            p-id="1901"
          />
        </svg>
      </div>
      {placement === 'left' && children}
    </div>
  )
}

export default CopyButton
