import type { ColumnsType } from 'antd/es/table'
import React from 'react'

import type { ProxyContractLog } from '@common/api/types'
import { CopyButton } from '@common/components'

import styles from './index.module.less'

const columns: ColumnsType<ProxyContractLog> = [
  {
    title: 'Block',
    dataIndex: 'block',
    key: 'block',
    render: block => (
      <div className={styles.cell}>
        <a
          href={`${window.location.origin}/block/${block}`}
          target="_blank"
          rel="noreferrer"
        >
          {block}
          <CopyButton className={styles.copyButton} text={block} />
        </a>
      </div>
    )
  },
  {
    title: 'Implementation Address',
    dataIndex: 'currentImpl',
    key: 'currentImpl',
    width: 200,
    render: currentImpl => (
      <div className={styles.cell}>
        <a
          href={`${window.location.origin}/address/${currentImpl}`}
          target="_blank"
          rel="noreferrer"
        >
          {currentImpl}
        </a>
        <CopyButton className={styles.copyButton} text={currentImpl} />
      </div>
    )
  },
  {
    title: 'Txn Hash',
    dataIndex: 'tx',
    key: 'tx',
    render: tx => (
      <div className={styles.cell}>
        <a
          href={`${window.location.origin}/tx/${tx}`}
          target="_blank"
          rel="noreferrer"
        >
          {tx}
        </a>
        <CopyButton className={styles.copyButton} text={tx} />
      </div>
    )
  },
  {
    title: (
      <div className="align-center">
        <img
          style={{ width: 16, height: 16, marginRight: 4 }}
          src="https://assets.blocksec.com/image/1681815761137-2.png"
          alt=""
        />
        Upgradehub
      </div>
    ),
    dataIndex: 'hub',
    key: 'hub',
    render: hub => (
      <a href={hub} target="_blank" rel="noreferrer">
        Diff
      </a>
    )
  }
]

export default columns
