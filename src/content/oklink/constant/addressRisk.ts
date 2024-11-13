import type {
  ADDRESS_RISK_LABELS,
  RISK_ITEM_OPTION
} from '@src/common/constants'
import { AddressRiskLevel } from '@src/common/constants'

export const AddressRisk: Record<
  (typeof ADDRESS_RISK_LABELS)[number],
  RISK_ITEM_OPTION<AddressRiskLevel>
> = {
  CRITICAL: {
    value: AddressRiskLevel.CRITICAL,
    icon: 'critical-risk',
    label: 'Critical Risk'
  },
  HIGH: {
    value: AddressRiskLevel.HIGH,
    icon: 'high-risk',
    label: 'High Risk'
  },
  MEDIUM: {
    value: AddressRiskLevel.MEDIUM,
    icon: 'medium-risk',
    label: 'Medium Risk'
  },
  LOW: {
    value: AddressRiskLevel.LOW,
    icon: 'low-risk',
    label: 'Low Risk'
  },
  NONE: {
    value: AddressRiskLevel.NONE,
    icon: 'no-risk',
    label: 'No Risk'
  }
}
