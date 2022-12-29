import React, { type FC } from 'react'

import type { OptKeys } from '@src/store'
import { Cell, Drawer, Switch } from '@common/components'
import { useStore } from '@common/hooks'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
  onChange: (key: OptKeys, value: unknown, refresh?: boolean) => void
}

const ConfigExploresDrawer: FC<Props> = ({ visible, onClose, onChange }) => {
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
                  checked={options.nftCollectionRisk as boolean}
                  onChange={val => onChange('nftCollectionRisk', val)}
                />
              }
            />
            <Cell
              title="Show owner's address label"
              action={
                <Switch
                  checked={options.nftOwnersLabel as boolean}
                  onChange={val => onChange('nftOwnersLabel', val)}
                />
              }
            />
            <Cell
              border={false}
              title="Show enhanced rarity information"
              action={
                <Switch
                  checked={options.nftRarity as boolean}
                  onChange={val => onChange('nftRarity', val)}
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
