import React, { type FC } from 'react'
import { Switch } from 'antd'

import type { OptKeys } from '@src/store'
import { Cell, Drawer } from '@common/components'
import { useStore } from '@common/hooks'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
  onSwitchChange: (key: OptKeys, value: boolean, refresh?: boolean) => void
}

const ConfigExploresDrawer: FC<Props> = ({
  visible,
  onClose,
  onSwitchChange
}) => {
  const [options] = useStore('options')

  return (
    <Drawer visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Cell.Group>
            <Cell
              title="Show comprehensive risk graph of the collection"
              action={
                <Switch
                  size="small"
                  checked={options.nftCollectionRisk}
                  onChange={val => onSwitchChange('nftCollectionRisk', val)}
                />
              }
            />
            <Cell
              title="Show owner's address label"
              action={
                <Switch
                  size="small"
                  checked={options.nftOwnersLabel}
                  onChange={val => onSwitchChange('nftOwnersLabel', val)}
                />
              }
            />
            <Cell
              border={false}
              title="Show enhanced rarity information"
              action={
                <Switch
                  size="small"
                  checked={options.nftRarity}
                  onChange={val => onSwitchChange('nftRarity', val)}
                />
              }
            />
          </Cell.Group>
        </div>
      </div>
    </Drawer>
  )
}

export default ConfigExploresDrawer
