import React, { type FC } from 'react'
import cls from 'classnames'
import * as echarts from 'echarts/core'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import { RadarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

import type { BaseComponent } from '@common/types'
import type { NFTRiskRes } from '@common/api/types'
import { NFT_RISKS } from '@common/constants'

import styles from './index.module.less'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  RadarChart,
  CanvasRenderer,
  LegendComponent
])

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
  const stylesheet = Object.assign({ height: `${height}px` }, style)

  const getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        confine: true,
        axisPointer: {
          type: 'cross',
          position: 'top',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: function (params: any, v: any) {
          const data = params.value
          function getRisk(value: number) {
            return Object.values(NFT_RISKS).find(
              item => item.value === value - 1
            )?.name
          }
          return `On-Chain Risk：<b>${getRisk(data[0])}</b><br/>
                  Off-Chain Risk: <b>${getRisk(data[1])}</b><br/>
                  Market Risk: <b>${getRisk(data[2])}</b>`
        }
      },
      radar: {
        shape: 'circle',
        splitNumber: 3,
        center: ['50%', '55%'],
        radius: '65%',
        nameGap: 5,
        triggerEvent: true,
        name: {
          textStyle: {
            color: '#999',
            backgroundColor: 'transparent'
          },
          rich: {
            a: {
              color: '#999',
              fontSize: 12,
              align: 'center'
            },
            b: {
              color: '#333',
              fontSize: 17,
              align: 'center'
            }
          }
        },
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        },
        indicator: [
          {
            name: 'On-Chain Risk',
            value: data.onChain,
            max: 3
          },
          {
            name: 'Off-Chain Risk',
            value: data.offChain,
            max: 3
          },
          {
            name: 'Market Risk',
            value: data.market,
            max: 3
          }
        ],
        splitArea: {
          show: false,
          areaStyle: {
            color: 'rgba(255,0,0,0)'
          }
        }
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [data.onChain, data.offChain, data.market].map(i => i + 1)
            }
          ]
        }
      ]
    }
  }

  return (
    <div className={cls(styles.container, className)} style={stylesheet}>
      <div className={styles.graph}>
        <ReactEChartsCore
          notMerge
          lazyUpdate
          option={getOption()}
          echarts={echarts}
          style={{ width, height }}
        />
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
