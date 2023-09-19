import { type FC, type CSSProperties, type ReactNode, useMemo } from 'react'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'

import styles from './index.module.less'

interface Props extends BaseComponent {
  fluid?: boolean
  children: ReactNode
}

const Container: FC<Props> = ({ children, fluid, className, style }) => {
  const containerStyles: CSSProperties = useMemo(() => {
    const properties: CSSProperties = {
      ...style
    }
    if (fluid) {
      properties.maxWidth = '100%'
    }
    return properties
  }, [fluid])

  return (
    <div className={cls(styles.container, className)} style={containerStyles}>
      {children}
    </div>
  )
}

export default Container
