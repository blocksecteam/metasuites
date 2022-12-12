import cls from 'classnames'
import type { FC, PropsWithChildren, ReactNode } from 'react'

import type { ButtonType, BaseComponent } from '@common/types'

import styles from './index.module.less'

interface Props extends BaseComponent {
  ml?: number
  mr?: number
  theme?: string
  fontColor?: string
  size?: 'xs'
  type?: ButtonType
  mode?: 'light' | 'dark'
  href?: string
  icon?: ReactNode
  onClick?: () => void
}

const Button: FC<PropsWithChildren<Props>> = props => {
  const {
    href,
    type = 'default',
    size = 'xss',
    theme,
    fontColor,
    className,
    style,
    children,
    ml,
    mr,
    icon,
    onClick
  } = props

  const classNames = cls(styles.btn, `btn-${type}`, `btn-${size}`, className)

  const stylesheet = Object.assign(
    {
      backgroundColor: theme,
      borderColor: theme,
      color: fontColor,
      marginLeft: ml,
      marginRight: mr
    },
    style
  )

  return (
    <>
      {href ? (
        <a
          className={classNames}
          href={href}
          style={stylesheet}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {icon && icon}
          {children}
        </a>
      ) : (
        <div className={classNames} style={stylesheet} onClick={onClick}>
          {icon && icon}
          {children}
        </div>
      )}
    </>
  )
}

export default Button
