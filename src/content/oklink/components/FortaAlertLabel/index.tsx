import { Tooltip } from 'antd'
import { type FC } from 'react'

import { getImageUrl } from '@common/utils'
import { TokenSymbol } from '@common/components'

import classNames from 'classnames'
import styles from './index.module.less'
import Link from '../Link'

interface Props {
  label: string
  alertUrl: string
}

const FortaAlertLabel: FC<Props> = ({ label, alertUrl }) => {
  return (
    <Tooltip
      destroyTooltipOnHide
      placement="top"
      title={
        <div className={styles.tooltipTitle}>
          <TokenSymbol style={{ marginRight: '6px' }} />
          <span>This label is provided by Forta</span>
          {alertUrl && (
            <Link
              isBlack
              className="ms-2"
              href={alertUrl}
            >
              Detail
            </Link>
          )}
        </div>
      }
      overlayStyle={{ maxWidth: 'max-content' }}
      overlayInnerStyle={{
        borderRadius: '0.5rem'
      }}
    >
      <div className={styles.risk}>
        <TokenSymbol mr={2} logo={getImageUrl('forta')} />
        {label}
      </div>
    </Tooltip>
  )
}

export default FortaAlertLabel
