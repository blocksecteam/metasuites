export const ADDRESS_RISK_LABELS = [
  'CRITICAL',
  'HIGH',
  'MEDIUM',
  'LOW',
  'NONE'
] as const

export const APPROVAL_RISK_LABELS = ['HIGH', 'MEDIUM', 'NONE'] as const

export enum AddressRiskLevel {
  NONE = 1,
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL
}

export type RISK_ITEM_OPTION<T> = {
  value: T
  icon: string
  label?: string
  desc?: string
}

export const ADDRESS_RISK_OPTIONS: Record<
  (typeof ADDRESS_RISK_LABELS)[number],
  RISK_ITEM_OPTION<AddressRiskLevel>
> = {
  CRITICAL: {
    value: AddressRiskLevel.CRITICAL,
    icon: 'address-critical-risk',
    label: 'Critical Risk'
  },
  HIGH: {
    value: AddressRiskLevel.HIGH,
    icon: 'address-high-risk',
    label: 'High Risk'
  },
  MEDIUM: {
    value: AddressRiskLevel.MEDIUM,
    icon: 'address-medium-risk',
    label: 'Medium Risk'
  },
  LOW: {
    value: AddressRiskLevel.LOW,
    icon: 'address-low-risk',
    label: 'Low Risk'
  },
  NONE: {
    value: AddressRiskLevel.NONE,
    icon: 'no-risk',
    label: 'No Risk'
  }
}

export enum NFTRiskLevel {
  LOW,
  MEDIUM,
  HIGH
}

export const NFT_RISKS: Record<string, { name: string; value: NFTRiskLevel }> =
  {
    LOW: {
      name: 'low risk',
      value: NFTRiskLevel.LOW
    },
    MEDIUM: {
      name: 'medium risk',
      value: NFTRiskLevel.MEDIUM
    },
    HIGH: {
      name: 'high risk',
      value: NFTRiskLevel.HIGH
    }
  }

export enum ApprovalRiskLevel {
  NONE,
  MEDIUM,
  HIGH
}

export const APPROVAL_RISK_OPTIONS: Record<
  (typeof APPROVAL_RISK_LABELS)[number],
  RISK_ITEM_OPTION<ApprovalRiskLevel>
> = {
  HIGH: {
    value: ApprovalRiskLevel.HIGH,
    icon: 'approval-high-risk',
    desc: 'This approval has been granted for a suspicious or risky address. If you were not aware of this approval, please revoke it for your asset security.'
  },
  MEDIUM: {
    value: ApprovalRiskLevel.MEDIUM,
    icon: 'approval-medium-risk',
    desc: 'This approval has been made for a contract that has not been verified. If you are not clear about this approval, please revoke it for your asset security.'
  },
  NONE: {
    value: ApprovalRiskLevel.NONE,
    icon: 'no-risk'
  }
}
