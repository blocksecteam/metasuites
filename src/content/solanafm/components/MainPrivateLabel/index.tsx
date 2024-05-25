import { type FC, useState } from 'react'

import { IconAdd, IconEdit, ModalAddPrivateLabel } from '@common/components'
import { useStore, useTheme } from '@common/hooks'
import { hexToRgba } from '@common/utils'
import type { ChainType } from '@common/constants'

import styles from './index.module.less'

interface Props {
  chainType: ChainType
  address: string
}

const DEFAULT_LABEL_COLOR = '#D9D9D9'

const MainPrivateLabel: FC<Props> = ({ address, chainType }) => {
  const [privateLabels] = useStore('privateLabels')

  const { isDarkMode } = useTheme()

  const [visible, setVisible] = useState(false)
  const privateLabel = privateLabels[`${chainType}-${address}`]

  const color = privateLabel?.color || DEFAULT_LABEL_COLOR

  return (
    <>
      {privateLabel ? (
        <div
          className={styles.label}
          style={{
            borderColor: hexToRgba(color, 0.2),
            backgroundColor: hexToRgba(color, 0.1)
          }}
        >
          <span style={{ backgroundColor: color }} className={styles.dot} />
          <span className="dark:text-gray-50">{privateLabel.label}</span>
          <IconEdit
            className="pointer"
            color={isDarkMode ? '#E5E5E8' : '#000'}
            onClick={() => setVisible(true)}
          />
        </div>
      ) : (
        <div className={styles.placeholder} onClick={() => setVisible(true)}>
          <IconAdd color="#448C0C" />
          Add Local Label
        </div>
      )}
      <ModalAddPrivateLabel
        chainType={chainType}
        address={address}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

export default MainPrivateLabel
