import { type FC } from 'react'

import type { TokenMarket } from '@common/api/types'
import { TokenType } from '@common/constants'

import styles from './index.module.less'

const MARKET_OPTIONS: Record<string, { color: string; logo: string }> = {
  blur: {
    color: '#090909',
    logo: 'https://assets.blocksec.com/image/1678686737332-2.png'
  },
  opensea: {
    color: '#2081E2',
    logo: 'https://assets.blocksec.com/image/1678687012716-2.png'
  },
  lookrare: {
    color: '#000000',
    logo: 'https://assets.blocksec.com/image/1678687034064-2.png'
  }
}

interface Props {
  tokenType: TokenType
  markets: TokenMarket[]
}

const TokenMarketplacesBtn: FC<Props> = ({ tokenType, markets }) => {
  const isNFT = tokenType === TokenType.ERC721

  return (
    <div className={styles.tokenMarketplacesBtn}>
      {isNFT ? (
        <>
          {markets.map(item => (
            <a
              key={item.name}
              style={{ background: MARKET_OPTIONS[item.name]?.color }}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={MARKET_OPTIONS[item.name]?.logo} alt="" />
            </a>
          ))}
        </>
      ) : (
        <>
          {/*TODO: Evaluate tokens for the next version */}
          {/*<a*/}
          {/*  style={{ background: '#F71E6D' }}*/}
          {/*  href={markets.find(i => i.name === 'uniswap')?.url}*/}
          {/*  target="_blank"*/}
          {/*  rel="noopener noreferrer"*/}
          {/*>*/}
          {/*  <img*/}
          {/*    src="https://assets.blocksec.com/image/1678687341246-2.png"*/}
          {/*    alt=""*/}
          {/*  />*/}
          {/*</a>*/}
          {/*<a*/}
          {/*  style={{ background: '#11192D' }}*/}
          {/*  href={markets.find(i => i.name === 'sushiswap')?.url}*/}
          {/*  target="_blank"*/}
          {/*  rel="noopener noreferrer"*/}
          {/*>*/}
          {/*  <img*/}
          {/*    src="https://assets.blocksec.com/image/1678687341246-3.png"*/}
          {/*    alt=""*/}
          {/*  />*/}
          {/*</a>*/}
        </>
      )}
    </div>
  )
}

export default TokenMarketplacesBtn
