import React, { type FC, useEffect, useState } from 'react'
import cls from 'classnames'
import ReactDOM from 'react-dom'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { getImageUrl } from '@common/utils'
import type { ProxyContractLog } from '@common/api/types'
import { chromeEvent } from '@common/event'
import { GET_PROXY_CONTRACT_LOG } from '@common/constants'
import { CopyButton } from '@common/components'

import styles from './index.module.less'
import TokenSymbol from '../TokenSymbol'

interface Props {
  chain: string
  address: string
  visible: boolean
  onClose: () => void
}

const ModalProxyLog: FC<Props> = ({ visible, onClose, chain, address }) => {
  const [loading, setLoading] = useState(false)
  const [dataList, setDataList] = useState<ProxyContractLog[]>([])

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
      title: 'Implementation address',
      dataIndex: 'proxyAddress',
      key: 'proxyAddress',
      render: proxyAddress => (
        <div className={styles.cell}>
          <a
            href={`${window.location.origin}/address/${proxyAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            {proxyAddress}
          </a>
          <CopyButton className={styles.copyButton} text={proxyAddress} />
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

  const getProxyLog = async () => {
    setLoading(true)
    const res = await chromeEvent.emit<
      typeof GET_PROXY_CONTRACT_LOG,
      ProxyContractLog[]
    >(GET_PROXY_CONTRACT_LOG, {
      chain,
      address
    })
    setLoading(false)
    if (res?.success && res?.data) {
      setDataList(res.data)
    }
  }

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'unset'
    if (visible) {
      getProxyLog()
    }
  }, [visible])

  useEffect(() => {
    // advance trigger request
    ;(() => {
      chromeEvent.emit<typeof GET_PROXY_CONTRACT_LOG, ProxyContractLog[]>(
        GET_PROXY_CONTRACT_LOG,
        {
          chain,
          address
        }
      )
    })()
  }, [])

  return ReactDOM.createPortal(
    <div className={cls(styles.modalProxyLog, { [styles.show]: visible })}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className="align-center">
            <TokenSymbol />
            Proxy Log
            <span className={styles.address}>({address})</span>
          </div>
          <div className={styles.btn} onClick={onClose}>
            <img src={getImageUrl('close')} alt="" />
          </div>
        </header>
        <div className={styles.body}>
          <Table
            loading={loading}
            className={styles.table}
            columns={columns}
            dataSource={dataList}
            pagination={false}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ModalProxyLog
