import { type FC } from 'react'

import styles from './index.module.less'

interface Props {
  iconUrl: string
  name: string
  href: string
}

const ExplorerLink: FC<Props> = props => {
  return (
    <a href={props.href} target="_blank" className={styles.container}>
      <img
        src={props.iconUrl}
        alt={props.name + ' explorer'}
        className={styles.icon}
      />
      <span className={styles.name}>{props.name}</span>
      <svg className={styles.arrow}>
        <use href="/icons/sprite.svg#arrows/north-east"></use>
      </svg>
    </a>
  )
}

export default ExplorerLink
