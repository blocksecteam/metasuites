import React, { type FC, useEffect, useState } from 'react'
import { QuestionCircleOutlined, SwapRightOutlined } from '@ant-design/icons'
import {
  Tooltip,
  Table,
  DatePicker,
  Space,
  InputNumber,
  Button,
  Empty
} from 'antd'
import isMobile from 'is-mobile'
import cls from 'classnames'
import dayjs, { type Dayjs } from 'dayjs'

import { BscModal, Image } from '@common/components'
import { downloadCsv } from '@common/utils'
import { chromeEvent } from '@common/event'
import {
  GET_CONTRACT_VARIABLE_LOGS,
  GET_CREATION_BLOCK,
  GET_LATEST_BLOCK
} from '@common/constants'
import type { ContractVariableLog, CreationBlock } from '@common/api/types'

import styles from './index.module.less'
import columns from './columns'

interface Props {
  chain: string
  implementation?: string
  address: string
  inputs: { name?: string; type: string; value: string }[]
  variableName: string
  returnType: string
  utc2locale: boolean
}

const MAX_LOG_ITEMS = 300

const ModalContractVariableLogs: FC<Props> = ({
  chain,
  inputs,
  address,
  implementation,
  variableName,
  returnType,
  utc2locale
}) => {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(true)
  const [filter, setFilter] = useState<'block' | 'time'>('time')
  const [list, setList] = useState<ContractVariableLog[]>([])
  const [creationBlock, setCreationBlock] = useState<CreationBlock | null>(null)
  const [blockRange, setBlockRange] = useState<number[]>([])
  const [dateRange, setDateRange] = useState<Dayjs[]>([])
  const [latestBlock, setLatestBlock] = useState(Number.MAX_SAFE_INTEGER)
  const [errorMsg, setErrorMsg] = useState('')
  const [type, setType] = useState('')

  const fetchData = async () => {
    setLoading(true)
    const res = await chromeEvent.emit<
      typeof GET_CONTRACT_VARIABLE_LOGS,
      ContractVariableLog[]
    >(GET_CONTRACT_VARIABLE_LOGS, {
      chain,
      address,
      filter,
      start: filter === 'block' ? blockRange[0] : dateRange[0]?.valueOf(),
      end: filter === 'block' ? blockRange[1] : dateRange[1]?.valueOf(),
      variableName,
      inputs,
      implAddress: implementation
    })
    setLoading(false)
    if (res?.success && res?.data) {
      setErrorMsg('')
      const datalist = res.data
      if (datalist.length > MAX_LOG_ITEMS) {
        datalist.splice(-2, 0, {
          isHolder: true,
          ...datalist[datalist.length - 1]
        })
      }
      setList(datalist.map((item, index) => ({ ...item, id: index + 1 })))
      const type = res.data[0]?.value?.filter(i => !i.deep)[0].type
      setType(type || returnType)
    } else {
      setType(returnType)
      setErrorMsg(res?.message ?? '')
    }
  }

  const getCreationBlock = async () => {
    const res = await chromeEvent.emit<
      typeof GET_CREATION_BLOCK,
      CreationBlock
    >(GET_CREATION_BLOCK, { chain, address })
    if (res?.success) {
      setCreationBlock(res.data)
    }
  }

  const getLatestBlock = async () => {
    const res = await chromeEvent.emit<
      typeof GET_LATEST_BLOCK,
      { latestBlockNumber: number }
    >(GET_LATEST_BLOCK, chain)
    if (res?.success) {
      setLatestBlock(res.data.latestBlockNumber)
    }
  }

  const exportTableData = () => {
    downloadCsv(`${address}-${variableName}`, list)
  }

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'unset'
  }, [visible])

  useEffect(() => {
    setBlockRange([creationBlock?.blockNumber ?? 0, latestBlock])
    setDateRange([dayjs(creationBlock?.timestamp ?? 0), dayjs()])
  }, [creationBlock, latestBlock])

  useEffect(() => {
    fetchData()
  }, [filter])

  useEffect(() => {
    getCreationBlock()
    getLatestBlock()
  }, [])

  return (
    <BscModal
      width="90%"
      className={styles.modalContractVariableLogs}
      destroyOnClose
      title={
        <div className={styles.title}>
          <span>Variable Logs</span>
          <Tooltip
            title="Explore the complete history of a variable"
            getPopupContainer={node => node}
          >
            <QuestionCircleOutlined
              style={{
                color: '#929292',
                marginLeft: 6,
                marginRight: 11,
                display: 'flex',
                alignItems: 'baseline'
              }}
            />
          </Tooltip>
          <span className={styles.contract}>({address})</span>
        </div>
      }
      footer={
        list.length > 0 ? (
          <div className="justify-end align-center">
            <Button
              type="primary"
              className="md-btn-primary"
              onClick={exportTableData}
            >
              Export
            </Button>
          </div>
        ) : null
      }
      open={visible}
      onCancel={() => setVisible(false)}
    >
      <div className={styles.container}>
        <div
          className={cls(styles.tablePanel, { [styles.mobile]: isMobile() })}
        >
          <div className={styles.metadata}>
            <span className={styles.variableName}>{variableName}</span>
            {inputs.length > 0 && (
              <span className={styles.key}>
                <Tooltip
                  getPopupContainer={node => node}
                  title={`[${inputs.map(i => i.value).join(',')}]`}
                >
                  <span style={{ color: '#F7CF9F' }}>[Keys]</span>
                </Tooltip>
              </span>
            )}
            {type && <span className={styles.type}>{type}</span>}
          </div>
          <div className={styles.filter}>
            <Space>
              {filter === 'block' ? (
                <Space>
                  <InputNumber
                    defaultValue={blockRange[0] ?? creationBlock?.blockNumber}
                    min={creationBlock?.blockNumber}
                    max={blockRange[1]}
                    onChange={v => {
                      if (v) {
                        setBlockRange([v, blockRange[1]])
                      }
                    }}
                  />
                  <SwapRightOutlined />
                  <InputNumber
                    defaultValue={blockRange[1] ?? latestBlock}
                    min={blockRange[0]}
                    max={latestBlock}
                    onChange={v => {
                      if (v) {
                        setBlockRange([blockRange[0], v])
                      }
                    }}
                  />
                  <Button type="primary" onClick={fetchData}>
                    Apply
                  </Button>
                </Space>
              ) : (
                <DatePicker.RangePicker
                  className={styles.dateRange}
                  value={dateRange as any}
                  disabledDate={current => {
                    const lowerLimit = new Date(creationBlock?.timestamp ?? 0)
                    const upperLimit = new Date()
                    const currentDate = new Date(current.valueOf())
                    return currentDate < lowerLimit || currentDate > upperLimit
                  }}
                  getPopupContainer={node => node}
                  showTime
                  onChange={dates => {
                    if (dates) {
                      const val = dates.map(date => dayjs(date))
                      setDateRange(val)
                      fetchData()
                    }
                  }}
                />
              )}
              <Image
                className="pointer"
                width={20}
                height={20}
                src={
                  filter === 'block'
                    ? 'https://assets.blocksec.com/image/1688958639908-2.png'
                    : 'https://assets.blocksec.com/image/1688957867055-2.png'
                }
                onClick={() =>
                  setFilter(val => (val === 'block' ? 'time' : 'block'))
                }
              />
            </Space>
          </div>
        </div>
        <Table
          loading={loading}
          bordered={false}
          dataSource={list}
          columns={columns(chain, utc2locale)}
          pagination={false}
          scroll={{ x: 575, y: 500 }}
          rowKey="id"
          className={styles.table}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={errorMsg || 'No data'}
              />
            )
          }}
        />
      </div>
    </BscModal>
  )
}

export default ModalContractVariableLogs
