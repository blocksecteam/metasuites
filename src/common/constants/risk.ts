export const RISK_LABELS = [
  'CRITICAL',
  'HIGH',
  'MEDIUM',
  'LOW',
  'NONE'
] as const

export enum AddressRiskLevel {
  NONE = 1,
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL
}

export interface RISK_ITEM_OPTION {
  value: AddressRiskLevel
  icon: string
  label: string
}

export const RISK_OPTIONS: Record<
  typeof RISK_LABELS[number],
  RISK_ITEM_OPTION
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
