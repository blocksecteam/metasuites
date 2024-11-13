import { type FC } from 'react'
import classNames from 'classnames'
import { Tooltip } from 'antd'

import { type AddressRiskLevel } from '@common/constants'

import styles from './index.module.less'
import { getOKLinkImage } from '../../utils'
import { AddressRisk } from '../../constant/addressRisk'

interface Props {
  risk: AddressRiskLevel
}

const MAILTO_URL = 'mailto:metadockteam@blocksec.com'

const ComplianceScoreLabel: FC<Props> = ({ risk }) => {
  const riskOpt = Object.values(AddressRisk).find(item => item.value === risk)

  if (!riskOpt) {
    return null
  }

  return (
    <Tooltip
      overlayInnerStyle={{ width: 288 }}
      title={
        <div>
          <a href={MAILTO_URL} target="_blank">
            Contact us{' '}
          </a>
          for any questions regarding compliance risk assessment by algorithm.
        </div>
      }
    >
      <div
        className={classNames(
          styles.complianceScoreLabel,
          styles[riskOpt.icon]
        )}
      >
        <img
          className={styles.iconRisk}
          src={getOKLinkImage(riskOpt.icon)}
          alt=""
        />
        {riskOpt.label}
      </div>
    </Tooltip>
  )
}

export default ComplianceScoreLabel
