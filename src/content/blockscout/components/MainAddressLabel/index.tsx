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
                <span className={cls(styles.direction)}>{'->'}</span>
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
