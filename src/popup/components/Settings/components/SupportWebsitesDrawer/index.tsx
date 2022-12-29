import React, { type FC } from 'react'

import { unique, getImageUrl } from '@common/utils'
import type { OptWebsite } from '@src/store'
import { Cell, Checkbox, Drawer } from '@common/components'
import { useStore } from '@common/hooks'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
  onChange: (opt: OptWebsite, value: boolean) => void
}

const SupportWebsitesDrawer: FC<Props> = ({ visible, onClose, onChange }) => {
  const [options] = useStore('options')

  return (
    <Drawer visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Cell.Group>
            {unique<OptWebsite>(
              options.supportWebList as OptWebsite[],
              'name'
            ).map(item => (
              <Cell
                pointer
                icon={getImageUrl(item.name)}
                key={item.name}
                border={false}
                title={item.name}
                desc={item.domains[0]}
                action={
                  <Checkbox
                    checked={item.enabled}
                    onChange={val => onChange(item, val)}
                  />
                }
                onClick={() => onChange(item, !item.enabled)}
              />
            ))}
          </Cell.Group>
        </div>
      </div>
    </Drawer>
  )
}

export default SupportWebsitesDrawer
