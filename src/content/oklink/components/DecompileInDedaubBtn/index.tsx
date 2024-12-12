import { memo, useMemo, type FC } from 'react'

import { DEDAUB_SUPPORT_DIRECT_LIST } from '@common/constants'
import { getImageUrl } from '@common/utils'

import styles from './index.module.less';
import OKLinkImage from '../OKLinkImage'
import META_SUITES_CLASS from '../../constant/metaSuites';

interface Props {
  mainAddress: string
  chain: string
}

const DecompileInDedaubBtn: FC<Props> = ({ mainAddress, chain }) => {
  const bytecode = useMemo(() => {
    return document.querySelector(META_SUITES_CLASS.contractCode)?.textContent?.trim()
  }, [])
  const toDedaub = () => {
    const item = DEDAUB_SUPPORT_DIRECT_LIST.find(item => item.chain === chain)
    if (item) {
      window.open(
        `https://app.dedaub.com/${item.pathname}/address/${mainAddress}/decompiled`
      )
    } else {
      const url = 'https://app.dedaub.com/api/on_demand'
      if (!bytecode) {
        window.open('https://app.dedaub.com/decompile')
        return
      }
      const data = {
        hex_bytecode: bytecode
      }
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authority: 'api.dedaub.com',
          origin: 'https://app.dedaub.com',
          referer: 'https://app.dedaub.com/'
        },
        body: JSON.stringify(data),
        mode: 'cors'
      })
        .then(response => response.text())
        .then(data => {
          window.open(
            `https://app.dedaub.com/decompile?md5=${data.replace(
              /"/g,
              ''
            )}&chain=${chain}&address=${mainAddress}`
          )
        })
        .catch(() => {
          window.open('https://app.dedaub.com/decompile')
        })
    }
  }

  return (
    <div
      onClick={toDedaub}
      className={styles.wrapper}
    >
      <OKLinkImage className={styles.img} src={getImageUrl('dedaub')} />
      Decompile in Dedaub
    </div>
  )
}

export default memo(DecompileInDedaubBtn);
