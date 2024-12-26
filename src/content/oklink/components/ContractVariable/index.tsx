import { type FC, memo, useMemo } from 'react'

import { TokenSymbol } from '@common/components'
import type { ContractVariableListItem } from '@src/common/api/types'
import { ContractVariableMutability, ContractVariableVisibility } from '@src/common/constants'
import styles from './index.module.less'

interface Props {
  variable: ContractVariableListItem
}

const ContractVariable: FC<Props> = ({ variable }) => {
  const visibilityText = useMemo(() => {
    return variable.visibility === ContractVariableVisibility.PRIVATE
    ? 'Private'
    : 'Public'
  }, [])
  const mutabilityText = useMemo(() => {
   return variable.mutability === ContractVariableMutability.IMMUTABLE
   ? 'Immutable'
   : ''
  }, [])
  
  return (
    <div className={styles.variable}>
      {'('}
      <TokenSymbol size={14.4} mr={4}/>
      {visibilityText}
      {mutabilityText}
      &nbsp;Variable
      {')'}
    </div>
  )
}

export default memo(ContractVariable);
