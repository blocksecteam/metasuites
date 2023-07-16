import { type FC, useState } from 'react'

import { TokenSymbol, ModalProxyLog } from '@common/components'

interface Props {
  chain: string
  address: string
}

const ProxyLogReference: FC<Props> = ({ chain, address }) => {
  const [visible, setVisible] = useState(false)

  const onClick = () => {
    setVisible(v => !v)
  }

  return (
    <>
      <li
        className="nav-item snap-align-start"
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <span className="nav-link">
          <TokenSymbol mr={4} />
          <span className="d-sm-inline-block">Proxy Upgrade Log</span>
        </span>
      </li>
      <ModalProxyLog
        chain={chain}
        address={address}
        visible={visible}
        onClose={() => setVisible(v => !v)}
      />
    </>
  )
}

export default ProxyLogReference
