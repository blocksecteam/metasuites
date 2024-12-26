import { type FC } from 'react'
import classNames from 'classnames'
import { Tooltip } from 'antd'

import { type AddressRiskLevel } from '@common/constants'

import styles from './index.module.less'
import { AddressRisk } from '../../constant/addressRisk'
import OKLinkImage from '../OKLinkImage'
import { getOKLinkImage } from '../../utils'
import Link from '../Link'

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
          <Link href={MAILTO_URL}>
            Contact us{' '}
          </Link>
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
        <OKLinkImage
          className={styles.iconRisk}
          src={getOKLinkImage(riskOpt.icon)}
        />
        {riskOpt.label}
      </div>
    </Tooltip>
  )
}

export default ComplianceScoreLabel
