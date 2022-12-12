import type { CSSProperties } from 'react'

declare const ButtonTypes: [
  'default',
  'primary',
  'ghost',
  'dashed',
  'link',
  'text',
  'secondary'
]

export type ButtonType = typeof ButtonTypes[number]

export interface BaseComponent {
  style?: CSSProperties
  className?: string
}
