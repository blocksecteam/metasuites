import type { ColumnsType } from 'antd/es/table'

import type { ProxyContractLog } from '@common/api/types'
import { CopyButton } from '@common/components'

import styles from './columns.module.less'
import { getAddressUrl, getBlockUrl, getTxUrl } from '../../utils/dealUrl'
import Link from '../Link'
import OKLinkImage from '../OKLinkImage'

const columns: ColumnsType<ProxyContractLog> = [
  {
    title: 'Block',
    dataIndex: 'block',
    key: 'block',
    render: block => (
      <div className={styles.cell}>
        <Link href={getBlockUrl({ block })}>
          {block}
          <CopyButton className={styles.copyButton} text={block} />
        </Link>
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
        <Link
          href={getAddressUrl({ address: currentImpl })}
        >
          {currentImpl}
        </Link>
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
        <Link href={getTxUrl({ hash: tx })}>
          {tx}
        </Link>
        <CopyButton className={styles.copyButton} text={tx} />
      </div>
    )
  },
  {
    title: (
      <div className="items-center md-flex">
        <OKLinkImage
          style={{ width: 16, height: 16, marginRight: 4 }}
          src="https://assets.blocksec.com/image/1681815761137-2.png"
        />
        Upgradehub
      </div>
    ),
    dataIndex: 'hub',
    key: 'hub',
    render: hub => (
      <Link href={hub}>
        Diff
      </Link>
    )
  }
]

export default columns
