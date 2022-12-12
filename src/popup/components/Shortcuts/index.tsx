import React, { type ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Button } from 'antd'
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
  createTab
} from '@common/utils'
import { SUPPORT_WEB_LIST } from '@common/constants'

import styles from './index.module.less'

const Shortcuts: React.FC = () => {
  const { t } = useTranslation()

  const [value, setValue] = useState('')
  const [unmatch, setUnmatch] = useState(false)
  const [loading, setLoading] = useState(false)

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    setValue(val)
    setUnmatch(false)
  }

  const onSearch = debounce(async () => {
    if (!value) return
    if (isAddress(value)) {
      const url = getExternalAddressUrl(value)
      setUnmatch(!url)
      return url && createTab(url)
    }
    if (isTransaction(value)) {
      const url = getExternalTxUrl(value)
      setUnmatch(!url)
      return url && createTab(url)
    }
    if (isMethod(value, false)) {
      setUnmatch(false)
      return createTab(getExternalSignatureUrl(value))
    }
    if (isENS(value)) {
      /** support eth only */
      setLoading(true)
      const provider = getDefaultProvider()
      const address = await provider.resolveName(value)
      if (address) {
        createTab(`https://etherscan.io/address/${address}`)
      }
      setUnmatch(!address)
      setLoading(false)
      return
    }
    setUnmatch(true)
  }, 300)

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={getImageUrl('logo')} alt="" />
      <Input
        className={cls(styles.input, { [styles.unmatch]: unmatch })}
        placeholder={t('shortcuts.placeholder')}
        status={unmatch ? 'error' : ''}
        onChange={onValueChange}
        onPressEnter={onSearch}
      />
      <Button
        type="primary"
        className={styles.searchBtn}
        loading={loading}
        onClick={onSearch}
      >
        Search
      </Button>
      <div className={styles.navbar}>
        <a
          href="https://phalcon.blocksec.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={getImageUrl('Phalcon')} alt="" />
        </a>
        {SUPPORT_WEB_LIST.map(item => (
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
