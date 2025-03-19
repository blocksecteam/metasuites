import { type FC, useState } from 'react'
import cls from 'classnames'

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
  const { isDarkMode } = useTheme()

  const { getPrivateLabel } = usePrivateLabels()

  const [visible, setVisible] = useState(false)
  const { privateLabel, color } = getPrivateLabel(chainType, address)

  return (
    <>
      {privateLabel ? (
        <div
          className={cls('badge py-1.5 px-2 rounded-pill', styles.label)}
          style={{
            borderColor: hexToRgba(color, 0.2),
            backgroundColor: hexToRgba(color, 0.1)
          }}
        >
          <span style={{ backgroundColor: color }} className={styles.dot} />
          <span style={{ color: isDarkMode ? '#f9fafb' : '#000' }}>
            {privateLabel.label}
          </span>
          <IconEdit
            className="pointer"
            color={isDarkMode ? '#E5E5E8' : '#000'}
            onClick={() => setVisible(true)}
            size={10.88}
          />
        </div>
      ) : (
        <div
          className={cls(
            'badge text-nowrap rounded-pill py-1.5 px-2 d-flex items-center pointer',
            styles.placeholder
          )}
          onClick={() => setVisible(true)}
        >
          <IconAdd color="#448C0C" size={10.88} />
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
