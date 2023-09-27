import React, { type FC } from 'react'
import { Tooltip, ConfigProvider } from 'antd'

import { numFormatter } from '@common/utils'
import type { NFTRarityRankResItem } from '@common/api/types'
import { IconLeftOutlined, IconMetaDock } from '@common/components'

import styles from './index.module.less'

interface Props {
  data: NFTRarityRankResItem
}

const RarityLabel: FC<Props> = ({ data: { rank, total } }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgSpotlight: '#fff',
          colorTextLightSolid: 'rgb(53, 56, 64)',
          paddingXS: 0,
          borderRadius: 12
        }
      }}
    >
      <Tooltip
        placement="top"
        title={
          <div className={styles.titleContainer}>
            <div>
              <span className={styles.rankLabel}>Rarity rank:</span>
              {`${numFormatter(rank.toString())} /
              ${numFormatter(total.toString())}`}
            </div>
            <a
              href="https://docs.blocksec.com/metadock/introduction"
              target="_blank"
              rel="noreferrer"
              className={styles.desc}
            >
              By NFTGo <IconLeftOutlined rotate={180} scale={0.6} />
            </a>
          </div>
        }
      >
        <div className={styles.container}>
          <div className={styles.symbol}>
            <div>#</div>
            <IconMetaDock className={styles.icon} />
          </div>
          <span>{numFormatter(rank.toString())}</span>
        </div>
      </Tooltip>
    </ConfigProvider>
  )
}

export default RarityLabel
