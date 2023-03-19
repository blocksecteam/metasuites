import { type FC } from 'react'

import type { TokenMarket } from '@common/api/types'

import styles from './index.module.less'

interface Props {
  markets: TokenMarket[]
}

const TokenMarketplacesBtn: FC<Props> = ({ markets }) => {
  return (
    <div className={styles.tokenMarketplacesBtn}>
      <a
        style={{ background: '#1FC7D4' }}
        href={markets.find(i => i.name === 'pancakeswap')?.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://assets.blocksec.com/image/1678691220594-2.png"
          alt=""
        />
      </a>
    </div>
  )
}

export default TokenMarketplacesBtn
