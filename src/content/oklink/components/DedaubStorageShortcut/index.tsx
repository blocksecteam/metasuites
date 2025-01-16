import { type FC } from 'react'

import { TokenSymbol } from '@common/components'

import { DEDAUB_SUPPORT_DIRECT_LIST } from '@common/constants'
import { getImageUrl } from '@common/utils'
import styles from './index.module.less'
import Link from '../Link'

interface Props {
  chain: string
  address: string
}

const DedaubStorageShortcut: FC<Props> = ({ chain, address }) => {
  const pathname = DEDAUB_SUPPORT_DIRECT_LIST.find(
    item => item.chain === chain
  )?.pathname

  return (
    <>
      {pathname && (
        <Link
          className={styles.wrapper}
          href={`https://app.dedaub.com/${pathname}/address/${address}/source?storage=true`}
        >
          <TokenSymbol
            className="f-filter"
            logo={getImageUrl('dedaub')}
            mr={4}
          />
          <span>View Storage</span>
        </Link>
      )}
    </>
  )
}

export default DedaubStorageShortcut
