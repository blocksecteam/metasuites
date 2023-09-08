import React, { type FC } from 'react'
import { Checkbox } from 'antd'

import { getImageUrl } from '@common/utils'
import { Cell, Drawer } from '@common/components'
import { useStore } from '@common/hooks'
import { type OptWebsite } from '@src/store'
import { EXT_SUPPORT_WEB_LIST } from '@common/constants'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
  onChange: (opt: OptWebsite, value: boolean) => void
}

const SupportWebsiteDrawer: FC<Props> = ({ visible, onClose, onChange }) => {
  const [supportWebList] = useStore('supportWebList')

  return (
    <Drawer visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Cell.Group>
            {EXT_SUPPORT_WEB_LIST.map(item => {
              const opt = Object.values(supportWebList).find(
                opt => opt.name === item.name
              )!
              return (
                <Cell
                  pointer
                  icon={getImageUrl(item.name)}
                  key={item.name}
                  border={false}
                  title={item.name}
                  desc={item.domains[0]}
                  action={
                    <Checkbox
                      checked={opt.enabled}
                      onChange={e => onChange(opt, e.target.checked)}
                    />
                  }
                  onClick={() => onChange(opt, !opt.enabled)}
                />
              )
            })}
          </Cell.Group>
        </div>
      </div>
    </Drawer>
  )
}

export default SupportWebsiteDrawer
