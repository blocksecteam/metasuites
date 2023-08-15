import { type FC } from 'react'

import styles from './index.module.less'

interface Props {
  block: string
}

const AlternativeBlockExplorersBtn: FC<Props> = ({ block }) => {
  return (
    <div className={styles.alternativeBlockExplorersBtn}>
      {/*<a*/}
      {/*  href={`https://explorer.edennetwork.io/block/${block}/`}*/}
      {/*  target="_blank"*/}
      {/*  rel="noopener noreferrer"*/}
      {/*>*/}
      {/*  Eden Network*/}
      {/*</a>*/}
      {/*<span className={styles.divider}>|</span>*/}
      <a
        href={`https://flashbots-explorer.marto.lol/?block=${block}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Flashbots Explorer
      </a>
    </div>
  )
}

export default AlternativeBlockExplorersBtn
