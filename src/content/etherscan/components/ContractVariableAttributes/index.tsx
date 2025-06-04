import React from 'react'

import {
  ContractVariableVisibility,
  ContractVariableMutability
} from '@common/constants'
import { IconMetaDock } from '@common/components'

interface ContractVariableAttributesProps {
  originalText: string
  visibility: ContractVariableVisibility
  mutability: ContractVariableMutability
}

const ContractVariableAttributes: React.FC<ContractVariableAttributesProps> = ({
  originalText,
  visibility,
  mutability
}) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span>{originalText}</span> (
      <IconMetaDock size={12} style={{ marginRight: '0.25rem' }} />
      <span>
        {visibility === ContractVariableVisibility.PRIVATE
          ? 'Private'
          : 'Public'}
        {mutability === ContractVariableMutability.IMMUTABLE
          ? ' Immutable'
          : ''}
        {' Variable'}
      </span>
      )
    </div>
  )
}

export default ContractVariableAttributes
