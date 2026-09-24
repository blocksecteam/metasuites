import { type FC } from 'react'

import { TokenSymbol } from '@common/components'

import { ChainFeature } from '@common/config/chain-feature'
import { getImageUrl } from '@common/utils'

interface Props {
  chain: string
  address: string
}

const DedaubStorageShortcut: FC<Props> = ({ chain, address }) => {
  const pathname = ChainFeature.metaOf('dedaub', chain)?.pathname

  return (
    <>
      {pathname && (
        <li
          className="nav-item snap-align-start pointer"
          onClick={() => {
            window.open(
              `https://app.dedaub.com/${pathname}/address/${address}/source?storage=true`,
              '_blank'
            )
          }}
        >
          <span className="nav-link">
            <TokenSymbol logo={getImageUrl('dedaub')} mr={4} />
            <span className="d-sm-inline-block">View Storage</span>
          </span>
        </li>
      )}
    </>
  )
}

export default DedaubStorageShortcut
