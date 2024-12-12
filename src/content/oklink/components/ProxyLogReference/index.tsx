import { type FC, useState } from 'react'

import { TokenSymbol, ModalProxyLog } from '@common/components'
import styles from './index.module.less';
import columns from './columns';

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
      <div
        className={styles.wrapper}
        onClick={onClick}
      >
        <TokenSymbol color="#fff" mr={4} />
        <span>Proxy Upgrade Log</span>
      </div>
      {visible && (<ModalProxyLog
        chain={chain}
        address={address.toLocaleLowerCase()}
        visible={visible}
        onClose={() => setVisible(v => !v)}
        customColumns={columns}
      />)}
    </>
  )
}

export default ProxyLogReference
