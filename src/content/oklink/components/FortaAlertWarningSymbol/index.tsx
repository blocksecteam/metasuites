import { useEffect, useRef, useMemo, type FC, useState } from 'react'

import { TokenSymbol } from '@common/components'

import { Tooltip } from 'antd'
import styles from './index.module.less'
import { getOKLinkImage } from '../../utils'
import OKLinkImage from '../OKLinkImage'
import Link from '../Link'

interface Props {
  alertUrl: string
  overlayOffsetX?: number
}

const FortaAlertWarningSymbol: FC<Props> = ({ alertUrl }) => {
  const title = useMemo(() => {
    return (
      <div>
        <TokenSymbol style={{ marginRight: '6px' }} />
        <span>Forta Alert: This is a suspicious exploit transaction</span>
        {alertUrl && (
          <Link className="ms-2" href={alertUrl} isBlack>
            Detail
          </Link>
        )}
      </div>
    )
  }, [alertUrl])
  return (
    <Tooltip title={title}>
      <div className={styles.box}>
        <OKLinkImage
          src={getOKLinkImage('warning')}
          className={styles.warning}
        />
      </div>
    </Tooltip>
  )
}

export default FortaAlertWarningSymbol
