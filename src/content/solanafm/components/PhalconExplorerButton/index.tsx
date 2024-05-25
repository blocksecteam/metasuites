import { type FC } from 'react'
import { Button } from 'antd'

import { IconExplorer } from '@common/components'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { PATTERN_EVM_TX_HASH } from '@common/constants'

import styles from './index.module.less'

const PhalconExplorerButton: FC = () => {
  const handleClick = () => {
    const txHash = window.location.href.match(PATTERN_EVM_TX_HASH)?.[0]
    window.open(`${PHALCON_EXPLORER_DOMAIN}/tx/merlin/${txHash}`, '_blank')
  }

  return (
    <Button
      size="small"
      type="primary"
      className={styles.button}
      onClick={handleClick}
    >
      <IconExplorer color="white" />
      Open in Phalcon Explorer
    </Button>
  )
}

export default PhalconExplorerButton
