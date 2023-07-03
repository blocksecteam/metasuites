import { Tooltip } from 'antd'
import { useEffect, useRef, useMemo, type FC, useState } from 'react'

import { TokenSymbol } from '@common/components'

import styles from './index.module.less'

interface Props {
  alertUrl: string
  overlayOffsetX?: number
  useAntd?: boolean
}

const FortaAlertWarningSymbol: FC<Props> = ({ alertUrl, useAntd }) => {
  const [offsetX, setOffsetX] = useState(-10)
  const ref = useRef<HTMLDivElement>(null)

  const overlayStyle = useMemo(() => {
    return {
      transform: `translateX(${offsetX}px) translateY(-100%)`,
      '--overlay-offset-x': `${Math.abs(offsetX)}px`
    }
  }, [offsetX])

  useEffect(() => {
    setOffsetX(
      (ref.current?.getBoundingClientRect()?.left ?? 0) < 60 ? -10 : -45
    )
  }, [ref])

  return (
    <>
      {useAntd ? (
        <Tooltip
          title={
            <div className={styles.tooltipTitle}>
              <TokenSymbol style={{ marginRight: '6px' }} />
              <span>Forta Alert: This is a suspicious exploit transaction</span>
              {alertUrl && (
                <a
                  className="ml-2"
                  href={alertUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Detail
                </a>
              )}
            </div>
          }
          overlayStyle={{ maxWidth: 'max-content' }}
          overlayInnerStyle={{
            borderRadius: '0.5rem'
          }}
        >
          <i className="fas fa-exclamation-triangle text-warning mr-1" />
        </Tooltip>
      ) : (
        <div ref={ref} className={styles.tooltip}>
          <span className={styles.reference}>
            <i className="fas fa-exclamation-triangle text-warning mr-1" />
          </span>
          <div className={styles.overlay} style={overlayStyle}>
            <div className={styles.overlayInner}>
              <TokenSymbol style={{ marginRight: '6px' }} />
              <span>Forta Alert: This is a suspicious exploit transaction</span>
              {alertUrl && (
                <a
                  className="ml-2"
                  href={alertUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Detail
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FortaAlertWarningSymbol
