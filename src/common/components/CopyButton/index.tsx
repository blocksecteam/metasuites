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
          width={size}
          height={size}
          viewBox="0 0 14 14"
          fill="none"
          className={styles.iconSuccess}
        >
          <path
            d="M7 0.5C10.59 0.5 13.5 3.41 13.5 7C13.5 8.72391 12.8152 10.3772 11.5962 11.5962C10.3772 12.8152 8.72391 13.5 7 13.5C5.27609 13.5 3.62279 12.8152 2.40381 11.5962C1.18482 10.3772 0.5 8.72391 0.5 7C0.5 3.41 3.41 0.5 7 0.5ZM7 1.5C5.54131 1.5 4.14236 2.07946 3.11091 3.11091C2.07946 4.14236 1.5 5.54131 1.5 7C1.5 8.45869 2.07946 9.85764 3.11091 10.8891C4.14236 11.9205 5.54131 12.5 7 12.5C8.45869 12.5 9.85764 11.9205 10.8891 10.8891C11.9205 9.85764 12.5 8.45869 12.5 7C12.5 5.54131 11.9205 4.14236 10.8891 3.11091C9.85764 2.07946 8.45869 1.5 7 1.5ZM9.27733 4.584C9.38766 4.65756 9.46424 4.77193 9.49025 4.90195C9.51625 5.03197 9.48955 5.167 9.416 5.27733L7.016 8.87733C6.97495 8.93883 6.92076 8.99045 6.85735 9.02849C6.79395 9.06652 6.72289 9.09002 6.64931 9.09729C6.57573 9.10456 6.50145 9.09542 6.43182 9.07053C6.3622 9.04563 6.29896 9.00561 6.24667 8.95333L4.64667 7.35333C4.55835 7.25855 4.51026 7.13319 4.51255 7.00365C4.51484 6.87412 4.56731 6.75053 4.65892 6.65892C4.75053 6.56731 4.87412 6.51484 5.00365 6.51255C5.13319 6.51026 5.25855 6.55835 5.35333 6.64667L6.522 7.81467L8.584 4.72267C8.65756 4.61234 8.77193 4.53576 8.90195 4.50975C9.03197 4.48375 9.167 4.51045 9.27733 4.584Z"
            fill="#448C0C"
          />
        </svg>
      </div>
      {placement === 'left' && children}
    </div>
  )
}

export default CopyButton
