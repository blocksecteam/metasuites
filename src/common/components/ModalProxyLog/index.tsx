import React, { type FC, useEffect, useState } from 'react'
import { Table, Empty } from 'antd'
import cls from 'classnames'
import isMobile from 'is-mobile'

import type { ProxyContractLog } from '@common/api/types'
import { chromeEvent } from '@common/event'
import { GET_PROXY_CONTRACT_LOG } from '@common/constants'
import { TokenSymbol, BscModal } from '@common/components'
import { getSubStr } from '@common/utils'

import styles from './index.module.less'
import columns from './columns'

interface Props {
  chain: string
  address: string
  visible: boolean
  onClose: () => void
}

const ModalProxyLog: FC<Props> = ({ visible, onClose, chain, address }) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [dataList, setDataList] = useState<ProxyContractLog[]>([])

  const getProxyLog = async () => {
    setLoading(true)
    setErrorMessage('')
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
    } else {
      setErrorMessage(res?.message ?? '')
    }
  }

  useEffect(() => {
    if (visible) getProxyLog()
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
  return (
    <BscModal
      width={761}
      className={styles.modalProxyLog}
      bodyStyle={{ padding: '10px 0 30px' }}
      destroyOnClose
      title={
        <div className={cls(styles.title, { [styles.column]: isMobile() })}>
          <div className="align-center">
            <TokenSymbol />
            Proxy Upgrade Log
          </div>
          <span className={styles.address}>
            ({isMobile() ? getSubStr(address) : address})
          </span>
        </div>
      }
      open={visible}
      onCancel={onClose}
    >
      <Table
        locale={{
          emptyText: () =>
            errorMessage || <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }}
        loading={loading}
        className={styles.table}
        scroll={{ x: 575, y: 500 }}
        columns={columns}
        dataSource={dataList}
        pagination={false}
        rowKey="id"
      />
    </BscModal>
  )
}

export default ModalProxyLog
