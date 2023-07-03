import { Tooltip, ConfigProvider, theme as antdTheme } from 'antd'
import { type FC } from 'react'

import { getImageUrl } from '@common/utils'
import { TokenSymbol } from '@common/components'

import styles from './index.module.less'

interface Props {
  label: string
  alertUrl: string
}

const FortaAlertLabel: FC<Props> = ({ label, alertUrl }) => {
  const theme = document.querySelector('#html')?.getAttribute('data-bs-theme')
  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm
      }}
    >
      <Tooltip
        destroyTooltipOnHide
        placement="top"
        title={
          <div className={styles.tooltipTitle}>
            <TokenSymbol style={{ marginRight: '6px' }} />
            <span>This label is provided by Forta</span>
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
        <div className="u-label u-label--secondary text-dark font-size-1 py-1 px-3 u-label--xs ml-2">
          <TokenSymbol
            style={{ marginRight: '6px' }}
            logo={getImageUrl('forta')}
          />
          {label}
        </div>
      </Tooltip>
    </ConfigProvider>
  )
}

export default FortaAlertLabel
