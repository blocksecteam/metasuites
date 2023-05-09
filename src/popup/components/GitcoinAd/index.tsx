import React, { type FC } from 'react'
import dayjs from 'dayjs'

import { Iconfont } from '@common/components'

import styles from './index.module.less'

const targetDate = dayjs.utc('2023-05-09 23:59:00')

const GitcoinAd: FC = () => {
  const showGitCoinAd = dayjs.utc() < targetDate

  if (!showGitCoinAd) return null

  return (
    <div className={styles.container}>
      <Iconfont type="icon-donate" mr={4} />
      Donate on
      <a
        href="https://explorer.gitcoin.co/#/round/1/0x12bb5bbbfe596dbc489d209299b8302c3300fa40/0x12bb5bbbfe596dbc489d209299b8302c3300fa40-104"
        target="_blank"
        rel="noreferrer"
      >
        &nbsp;Gitcoin&nbsp;
      </a>
      to help us do better
    </div>
  )
}

export default GitcoinAd
