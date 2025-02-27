import { type FC } from 'react'
import { Tooltip } from 'antd'
import cls from 'classnames'

import type { AddressLabel } from '@common/api/types'
import { TokenSymbol } from '@common/components'
import styles from './index.module.less'

import { Tag } from '../index'
import { address } from '../../utils'

const BUG_REPORT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfWk-74XOBL6sU7SgFRIuDzbFwaUt0wf7C4KE8U_E5FUcboog/viewform?usp=pp_url&entry.1591633300=Bug/Label+Reports'

interface Props {
  data: AddressLabel
}

const MainAddressLabel: FC<Props> = ({
  data: { label, implementLabel, implementAddress, implementLogo }
}) => {
  return (
    <Tooltip
      title={
        <a href={BUG_REPORT_URL} target="_blank" className={cls(styles.link)}>
          Report
        </a>
      }
    >
      <div>
        <Tag icon={<TokenSymbol color="var(--chakra-colors-gray-500)" />}>
          <div className={cls(styles.container)}>
            {label.startsWith('0x') ? address.truncate(label) : label}
            {implementLabel?.trim() && implementAddress && (
              <div className={cls(styles.implementation)}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.arrow}
                >
                  <path
                    d="M11.535 11.293a1 1 0 0 0 0 1.414l3.536 3.536a1 1 0 1 1-1.414 1.414l-4.95-4.95a1 1 0 0 1 0-1.414l4.95-4.95a1 1 0 1 1 1.414 1.414l-3.536 3.536Z"
                    fill="currentColor"
                  />
                </svg>
                <TokenSymbol
                  logo={implementLogo}
                  color="var(--chakra-colors-gray-500)"
                />
                <a
                  href={`/address/${implementAddress}`}
                  target="_blank"
                  className={cls(styles.link)}
                >
                  {' '}
                  {implementLabel.startsWith('0x')
                    ? address.truncate(implementAddress)
                    : implementLabel}
                </a>
              </div>
            )}
          </div>
        </Tag>
      </div>
    </Tooltip>
  )
}

export default MainAddressLabel
