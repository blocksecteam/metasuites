import { type FC, memo, useEffect, useState } from 'react'

import type { PrivateVariable } from '@common/api/types'

import styles from './index.module.less'
import ContractVariableLogBtn from '../../ContractVariableLogBtn'
interface Props {
  address: string
  variableName: string
  utc2locale: boolean
  parentDomRef: React.RefObject<HTMLDivElement>
  implementation?: string
  onQuery: () => void
  data: PrivateVariable
}

const ButtonGroup: FC<Props> = ({
  address,
  data,
  parentDomRef,
  variableName,
  utc2locale,
  implementation,
  onQuery
}) => {
  const [itemBox, setItemBox] = useState(parentDomRef.current)
  useEffect(() => {
    setItemBox(parentDomRef.current)
  }, [])

  return (
    <div className={styles.buttonGroup}>
      {!!data.inputs?.length && (
        <button className={styles.button} onClick={onQuery}>
          Query
        </button>
      )}
      <ContractVariableLogBtn
        implementation={implementation}
        variableName={variableName}
        utc2locale={utc2locale}
        address={address}
        itemBox={itemBox}
      />
    </div>
  )
}

export default memo(ButtonGroup)
