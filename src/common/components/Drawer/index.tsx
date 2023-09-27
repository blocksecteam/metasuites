import type { FC, PropsWithChildren } from 'react'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'
import { IconClose } from '@common/components'

import styles from './index.module.less'

interface Props extends BaseComponent {
  title?: string
  visible: boolean
  onClose: () => void
}

const Drawer: FC<PropsWithChildren<Props>> = props => {
  const { title = '', visible, children, className, style, onClose } = props

  return (
    <div
      className={cls(styles.drawer, className, { [styles.show]: visible })}
      style={style}
      onClick={onClose}
    >
      <div className={styles.container}>
        <div
          className={cls(styles.content, { [styles.show]: visible })}
          onClick={e => e.stopPropagation()}
        >
          <header className={styles.title}>
            {title}
            <div className={styles.iconContainer} onClick={onClose}>
              <IconClose />
            </div>
          </header>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Drawer
