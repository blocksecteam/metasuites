import { type FC } from 'react'
import cls from 'classnames'

import { getImageUrl } from '@common/utils'
import { type RISK_LEVELS, RISK_OPTIONS } from '@common/constants'

import styles from './index.module.less'

interface Props {
  risk: typeof RISK_LEVELS[number]
}

const ComplianceScoreLabel: FC<Props> = ({ risk }) => {
  const riskOpt = Object.values(RISK_OPTIONS).find(item => item.value === risk)

  return (
    <>
      {riskOpt && (
        <div
          className={cls(styles.complianceScoreLabel, {
            [styles.lowRisk]: [
              RISK_OPTIONS.NONE.value,
              RISK_OPTIONS.LOW.value
            ].includes(riskOpt.value)
          })}
        >
          <img
            className={styles.iconRisk}
            src={getImageUrl(riskOpt.icon)}
            alt=""
          />
          {riskOpt.label}
        </div>
      )}
    </>
  )
}

export default ComplianceScoreLabel
