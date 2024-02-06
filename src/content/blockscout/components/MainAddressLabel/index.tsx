import { type FC } from 'react'
import { Tag, Tooltip } from 'antd'
import cls from 'classnames'

import type { AddressLabel } from '@common/api/types'
import { TokenSymbol } from '@common/components'
import styles from './index.module.less'

interface Props {
  data: AddressLabel
}

const MainAddressLabel: FC<Props> = ({
  data: { label, implementLabel, implementAddress, implementLogo }
}) => {
  return (
    <Tooltip
      title={
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfWk-74XOBL6sU7SgFRIuDzbFwaUt0wf7C4KE8U_E5FUcboog/viewform?usp=pp_url&entry.1591633300=Bug/Label+Reports"
          target="_blank"
        >
          Report
        </a>
      }
    >
      <Tag
        icon={<TokenSymbol />}
        color="geekblue"
        className={cls(styles.container)}
      >
        {label}
        {implementLabel?.trim() && (
          <a href={`/address/${implementAddress}`} target="_blank">
            {` ( ->`} <TokenSymbol logo={implementLogo} /> {implementLabel} )
          </a>
        )}
      </Tag>
    </Tooltip>
  )
}

export default MainAddressLabel
