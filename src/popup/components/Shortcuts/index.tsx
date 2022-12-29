import React, { type ChangeEvent, type FC, useState, useEffect } from 'react'
import { Input } from 'antd'
import { getDefaultProvider } from 'ethers'
import { debounce } from 'lodash-es'
import cls from 'classnames'

import {
  getImageUrl,
  isAddress,
  isTransaction,
  isMethod,
  isENS,
  getExternalSignatureUrl,
  getExternalTxUrl,
  getExternalAddressUrl,
  createTab,
  getSubStr
} from '@common/utils'
import { EXT_SUPPORT_WEB_LIST } from '@common/constants'
import { Iconfont, LoadingOutlined } from '@common/components'

import type { SearchResultItem } from './type'
import styles from './index.module.less'

const Shortcuts: FC = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([])

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim())
  }

  const onSearch = debounce(async () => {
    if (!value) {
      onClear()
      return
    }
    setSearchResults([])
    if (isAddress(value)) {
      const result: SearchResultItem = {
        type: 'Address',
        link: getExternalAddressUrl(value),
        title: getSubStr(value, [27, 4])
      }
      setSearchResults([result])
    }
    if (isTransaction(value)) {
      const result: SearchResultItem = {
        type: 'Transaction',
        link: getExternalTxUrl(value),
        title: value
      }
      setSearchResults([result])
    }
    if (isMethod(value, false)) {
      const result: SearchResultItem = {
        type: 'Selector',
        link: getExternalSignatureUrl(value),
        title: value
      }
      setSearchResults([result])
    }
    if (isENS(value)) {
      /** support eth only */
      setLoading(true)
      const provider = getDefaultProvider()
      const address = await provider.resolveName(value)
      setLoading(false)
      if (address) {
        const result: SearchResultItem = {
          type: 'Selector',
          link: `https://etherscan.io/address/${address}`,
          title: value
        }
        setSearchResults([result])
      }
    }
  }, 300)

  const onClear = () => {
    setSearchResults([])
    setValue('')
  }

  useEffect(() => {
    onSearch()
  }, [value])

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={getImageUrl('logo')} alt="" />
      <div className={styles.searchBarContainer}>
        <Input
          value={value}
          className={styles.input}
          placeholder="Search for address, transaction, ENS, selector"
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
          onPressEnter={onSearch}
        />
        {/* TODO: by group */}
        <ul
          className={cls(styles.searchResultList, {
            [styles.show]: !!searchResults.length
          })}
        >
          {searchResults.map(item => (
            <li
              key={item.title}
              className={styles.searchResultItem}
              onClick={() => createTab(item.link)}
            >
              <div className={styles.type}>{item.type}</div>
              <div className={styles.content}>
                <div className={styles.title}>
                  {getSubStr(item.title, [27, 4])}
                </div>
                <a className={styles.link}>{item.link}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.navbar}>
        <a
          href="https://phalcon.blocksec.com/"
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
