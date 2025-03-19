import { type FC, useState } from 'react'

import { IconAdd, IconEdit, ModalAddPrivateLabel } from '@common/components'
import { useTheme, usePrivateLabels } from '@common/hooks'
import { hexToRgba } from '@common/utils'
import type { ChainType } from '@common/constants'

import styles from './index.module.less'

interface Props {
  chainType: ChainType
  address: string
}

const MainPrivateLabel: FC<Props> = ({ address, chainType }) => {
  const { getPrivateLabel } = usePrivateLabels()

  const { isDarkMode } = useTheme()

  const [visible, setVisible] = useState(false)
  const { privateLabel, color } = getPrivateLabel(chainType, address)

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
