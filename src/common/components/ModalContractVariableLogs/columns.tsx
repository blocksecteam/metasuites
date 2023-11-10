import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import cls from 'classnames'

import type { ContractVariableLog } from '@common/api/types'
import { getSubStr, convertUTCDateToLocalDate } from '@common/utils'
import { PHALCON_SUPPORT_LIST } from '@common/constants'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'

import styles from './index.module.less'
import { CopyButton } from '../../components'

const sharedOnCell = (record: ContractVariableLog) => {
  if (record.isHolder) {
    return { colSpan: 0 }
  }
  return {}
}

const columns = (
  chain: string,
  utc2locale: boolean
): ColumnsType<ContractVariableLog> => {
  const getExplorerURL = (txHash: string) => {
    const support = PHALCON_SUPPORT_LIST.find(i => i.chain === chain)
    if (support) {
      return `${PHALCON_EXPLORER_DOMAIN}/tx/${support.pathname}/${txHash}`
    }
    return `/tx/${txHash}`
  }

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: number, record) => {
        if (record.isHolder) return ''
        if (record.isCreation) return '(Deployed)'
        if (record.isFirstUpdate) return '(1st Update)'
        return id
      },
      onCell: sharedOnCell
    },
    {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
      width: 150,
      render: (block: number, record) =>
        record.isHolder ? (
          ''
        ) : (
          <CopyButton hover text={String(block)} ml={4}>
            <a href={`/block/${block}`} target="_blank" rel="noreferrer">
              {block}
            </a>
          </CopyButton>
        ),
      onCell: sharedOnCell
    },
    {
      title: `Date Time (${utc2locale ? 'local time' : 'UTC'})`,
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 220,
      render: (timestamp: number, record) => {
        if (record.isHolder) return ''
        const formattedDate = dayjs(timestamp)
          .utc()
          .format('YYYY-MM-DD HH:mm:ss')
        return (
          <span>
            {utc2locale
              ? convertUTCDateToLocalDate(formattedDate)
              : formattedDate}
          </span>
        )
      },
      onCell: sharedOnCell
    },
    {
      title: 'Value After Update',
      dataIndex: 'value',
      key: 'value',
      width: '70%',
      render: (value: ContractVariableLog['value'], record) => {
        const isBasicType = value?.length === 1
        if (record.isHolder)
          return (
            <div className={styles.splitRow}>
              Over 300 logs found. For more concise results, please narrow your
              time range.
            </div>
          )

        return value ? (
          <ul className={styles.values}>
            {value
              .filter(i => !!i.value)
              .map((v, i) => (
                <li key={i}>
                  {!isBasicType && v.name && (
                    <span className={styles.name}>{v.name}:</span>
                  )}
                  <span
                    className={cls(styles.value, {
                      [styles.basic]: isBasicType
                    })}
                  >
                    {v.type === 'address' ? (
                      <a href={`/address/${v.value}`} target="_blank">
                        {v.value}
                      </a>
                    ) : (
                      v.value
                    )}
                  </span>
                  <span className={styles.hoverShow}>
                    {!isBasicType && (
                      <span className={styles.type}>{v.type}</span>
                    )}
                    <CopyButton text={v.value} ml={4} />
                  </span>
                </li>
              ))}
          </ul>
        ) : (
          '-'
        )
      },
      onCell: (record: ContractVariableLog) => {
        return record.isHolder ? { colSpan: 5 } : {}
      }
    },
    {
      title: 'Txn Hash',
      dataIndex: 'txHash',
      key: 'txHash',
      width: '30%',
      render: (txHash: ContractVariableLog['txHash'], record) =>
        record.isHolder ? (
          ''
        ) : (
          <CopyButton hover text={txHash} ml={4}>
            <a href={getExplorerURL(txHash)} target="_blank" rel="noreferrer">
              {getSubStr(txHash, [8])}
            </a>
          </CopyButton>
        ),
      onCell: sharedOnCell
    }
  ]
}

export default columns
