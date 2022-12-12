export const RISK_LABELS = [
  'CRITICAL',
  'HIGH',
  'MEDIUM',
  'LOW',
  'NONE'
] as const
export const RISK_LEVELS = [1, 2, 3, 4, 5] as const

export interface RISK_ITEM_OPTION {
  value: typeof RISK_LEVELS[number]
  icon: string
  label: string
}

export const RISK_OPTIONS: Record<
  typeof RISK_LABELS[number],
  RISK_ITEM_OPTION
> = {
  CRITICAL: {
    value: 5,
    icon: 'critical-risk',
    label: 'Critical Risk'
  },
  HIGH: {
    value: 4,
    icon: 'high-risk',
    label: 'High Risk'
  },
  MEDIUM: {
    value: 3,
    icon: 'medium-risk',
    label: 'Medium Risk'
  },
  LOW: {
    value: 2,
    icon: 'low-risk',
    label: 'Low Risk'
  },
  NONE: {
    value: 1,
    icon: 'no-risk',
    label: 'No Risk'
  }
}
