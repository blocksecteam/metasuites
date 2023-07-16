import { Modal, type ModalProps } from 'antd'
import React, { type FC } from 'react'
import cls from 'classnames'

import { IconClose } from '@common/components'

import styles from './index.module.less'

const BscModal: FC<ModalProps> = ({
  width,
  className,
  style,
  title,
  onCancel,
  children,
  ...rest
}) => {
  return (
    <Modal
      width={width}
      zIndex={2147483647}
      title={
        <div className={styles.modalTitle}>
          {title}
          <div
            className={styles.closeIcon}
            onClick={e =>
              onCancel?.(
                e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>
              )
            }
          >
            <IconClose />
          </div>
        </div>
      }
      centered
      onCancel={onCancel}
      className={cls(styles.bscModal, className)}
      style={style}
      footer={null}
      closable={false}
      {...rest}
    >
      {children}
    </Modal>
  )
}

export default BscModal
