import React, { type FC } from 'react'
import { Radar } from '@ant-design/plots'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'
import type { NFTRiskRes } from '@common/api/types'
import { NFT_RISKS } from '@common/constants'

import styles from './index.module.less'

interface Props extends BaseComponent {
  width?: number
  height?: number
  data: NFTRiskRes
}

const ComplianceRadarPlot: FC<Props> = ({
  className,
  style,
  width = 292,
  height = 182,
  data
}) => {
  const getConfig = (data: NFTRiskRes) => {
    return {
      data: [
        {
          name: 'On-Chain Risk',
          value: data.onChain
        },
        {
          name: 'Off-Chain Risk',
          value: data.offChain
        },
        {
          name: 'Market Risk',
          value: data.market
        }
      ],
      xField: 'name',
      yField: 'value',
      appendPadding: [0, 10, 0, 10],
      tooltip: {
        customContent: (title: string, data: any) => {
          const riskLabel = Object.values(NFT_RISKS).find(
            item => item.value === data[0]?.data?.value
          )?.name
          return `<div style="padding: 7px 11px">
                    <p style="line-height: 16px; margin-bottom: 6px">${title}</p>
                    <p style="line-height: 16px;">${riskLabel}</p>
                  </div>`
        }
      },
      xAxis: {
        tickLine: null
      },
      yAxis: {
        label: false,
        min: -1,
        max: 2,
        grid: {
          alternateColor: 'rgba(0, 0, 0, 0.04)'
        }
      }
    }
  }

  const stylesheet = Object.assign({ height: `${height}px` }, style)

  return (
    <div className={cls(styles.container, className)} style={stylesheet}>
      <div className={styles.graph}>
        <Radar width={width} {...getConfig(data)} />
      </div>
      <a
        href="https://docs.blocksec.com/metadock/features/nft-comprehensive-risk-radar-chart"
        target="_blank"
        rel="noreferrer"
        className={styles.desc}
      >
        By MetaDock &gt;
      </a>
    </div>
  )
}

export default ComplianceRadarPlot
