import { type FC } from 'react'
import { Tag as AntdTag } from 'antd'
import cls from 'classnames'
import styles from './index.module.less'

interface Props {
  className?: string
  children: React.ReactNode
  icon?: React.ReactNode
}

const Tag: FC<Props> = ({ className, children, icon }) => {
  return (
    <AntdTag
      icon={icon}
      bordered={false}
      className={cls(styles.container, className)}
    >
      {children}
    </AntdTag>
  )
}

export default Tag
