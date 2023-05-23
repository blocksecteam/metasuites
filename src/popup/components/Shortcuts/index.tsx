import React, {
  type ChangeEvent,
  type FC,
  useState,
  type ReactNode,
  type KeyboardEvent,
  useEffect,
  useCallback,
  useRef
} from 'react'
import { Input } from 'antd'
import * as blockies from 'blockies-ts'
import { debounce } from 'lodash-es'
import cls from 'classnames'

import { getImageUrl, createTab } from '@common/utils'
import { EXT_SUPPORT_WEB_LIST } from '@common/constants'
import { Iconfont, LoadingOutlined } from '@common/components'
import type {
  SearchResultType,
  SearchResultItem,
  SearchResultItemValue
} from '@common/api/types'
import commonApi from '@common/api'

import styles from './index.module.less'

const Shortcuts: FC = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([])
  const valueRef = useRef(value)

  const onValueChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
    if (!value) {
      onClear()
      return
    }
    if (value.trim()) {
      onSearch()
    }
  }

  const onSearch = useCallback(
    debounce(async () => {
      setLoading(true)
      const { data, success } = await commonApi.getComprehensiveSearchResults({
        type: -1,
        keyword: valueRef.current
      })
      setActiveIdx(0)
      setLoading(false)
      if (success) {
        setSearchResults(data ?? [])
      } else {
        setSearchResults([])
      }
    }, 500),
    []
  )

  const onClear = () => {
    setSearchResults([])
    setValue('')
  }

  const onNavigate = (url?: string) => {
    url && createTab(url)
  }

  const renderSearchResultItem = (
    type: SearchResultType,
    item: SearchResultItemValue
  ): ReactNode => {
    switch (type) {
      case 'Address':
      case 'Transaction':
      case 'ENS': {
        const title = item.address || item.txn
        return (
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            {item.url && <a className={styles.link}>{item.url}</a>}
          </div>
        )
      }
      case 'Selector': {
        const key = item.selector
        const value = item.function
        return (
          <div className={styles.content}>
            <div className={styles.title}>{`${key} ${value}`}</div>
          </div>
        )
      }
      case 'NFT':
      case 'Token':
      case 'ApprovalDiagnosis': {
        const image =
          item.image || blockies.create({ seed: item.name }).toDataURL()
        return (
          <div className={cls(styles.content, 'align-center')}>
            <img className={styles.iconImg} src={image} alt="" loading="lazy" />
            <div className={cls('flex1')} style={{ overflow: 'hidden' }}>
              <div className={styles.title}>{item.name ?? item.address}</div>
              {item.url && (
                <a className={cls('text-ellipsis', styles.link)}>{item.url}</a>
              )}
            </div>
          </div>
        )
      }
      default:
        return null
    }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'ArrowDown') {
      setActiveIdx(idx => idx + 1)
    } else if (event.code === 'ArrowUp') {
      setActiveIdx(idx => (idx > 0 ? idx - 1 : idx))
    } else if (event.code === 'Enter') {
      const item = document.querySelectorAll<HTMLElement>('.item')?.[activeIdx]
      if (item) {
        const dataId = item.getAttribute('data-id')
        if (dataId) {
          const [type, index] = dataId.split('-')
          const origin = searchResults.find(item => item.type === type)
            ?.value?.[Number(index)]
          onNavigate(origin?.url)
        }
      }
    }
  }

  useEffect(() => {
    if (activeIdx) {
      const items = document.querySelectorAll<HTMLElement>('.item')
      Array.from(items).forEach((item, index) => {
        item.style.opacity = index === activeIdx - 1 ? '0.3' : '1'
        if (index === activeIdx - 1) {
          item.scrollIntoView()
        }
      })
    }
  }, [activeIdx])

  useEffect(() => {
    valueRef.current = value
  })

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={getImageUrl('logo')} alt="" />
      <div className={styles.searchBarContainer}>
        <Input
          value={value}
          className={styles.input}
          placeholder="Search in Web3"
          onChange={onValueChange}
          suffix={
            loading ? (
              <LoadingOutlined />
            ) : (
              <Iconfont
                style={{ display: value ? 'inline' : 'none' }}
                type="icon-cuowu"
                cursor="pointer"
                onClick={onClear}
              />
            )
          }
          onKeyUp={onKeyUp}
        />
        <div
          className={cls(styles.searchResultList, {
            [styles.show]: !!searchResults.length
          })}
        >
          {searchResults.map(group => (
            <div key={group.type} className={styles.searchResultItem}>
              <div className={styles.type}>{group.type}</div>
              {group.value.map((item, key) => (
                <div
                  data-id={`${group.type}-${key}`}
                  key={key}
                  onClick={() => onNavigate(item.url)}
                >
                  {renderSearchResultItem(group.type, item)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.navbar}>
        <a
          href="https://explorer.phalcon.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={getImageUrl('Phalcon')} alt="" />
        </a>
        {EXT_SUPPORT_WEB_LIST.filter(item => !!item.chain).map(item => (
          <a
            key={item.name}
            href={`${item.href ? item.href : 'https://' + item.domains[0]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={getImageUrl(item.name)} alt="" />
          </a>
        ))}
      </div>
    </div>
  )
}

export default Shortcuts
