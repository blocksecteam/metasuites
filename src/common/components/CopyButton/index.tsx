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
}

const CopyButton: FC<PropsWithChildren<Props>> = ({
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
    const target = e.target as HTMLElement
    if (target.nodeName.toLowerCase() === 'a' && target.getAttribute('href')) {
      return
    }
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
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.iconCopy}
          width={size}
          height={size}
          // @ts-ignore
          onClick={onCopy}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.iconSuccess}
          width={size}
          height={size}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
      {placement === 'left' && children}
    </div>
  )
}

export default CopyButton
