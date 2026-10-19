import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, expect, test, vi } from 'vitest'

import type { PrivateLabel } from '@src/store'
import { ChainType } from '@common/constants'
import usePrivateLabels from '@common/hooks/usePrivateLabels'
import { downloadCsv } from '@common/utils/download'
import { parse } from 'papaparse'
import Etherscan from '@src/content/etherscan/components/MainPrivateLabel'
import Solscan from '@src/content/solscan/components/MainPrivateLabel'
import SolanaExplorer from '@src/content/solanaexpl/components/MainPrivateLabel'
import Tronscan from '@src/content/tronscan/components/MainPrivateLabel'
import Btc from '@src/content/btc/components/MainPrivateLabel'
import Arkham from '@src/content/arkham/components/MainPrivateLabel'
import Debank from '@src/content/debank/components/MainPrivateLabel'

const state = vi.hoisted(() => ({
  options: { enablePrivateLabels: true, syncPhalconLabels: true },
  privateLabels: {} as Record<string, PrivateLabel>,
  write: vi.fn(),
  read: vi.fn()
}))

vi.mock('@common/hooks/useStore', () => ({
  default: (key: 'options' | 'privateLabels') => {
    state.read(key)
    return [state[key], state.write]
  }
}))
vi.mock('@common/hooks', async () => ({
  usePrivateLabels: (await import('@common/hooks/usePrivateLabels')).default,
  useStore: (await import('@common/hooks/useStore')).default,
  useTheme: () => ({ isDarkMode: false })
}))
vi.mock('@common/components', () => ({
  IconAdd: () => null,
  IconEdit: () => null,
  ModalAddPrivateLabel: () => null
}))
vi.mock('@common/components/ModalAddPrivateLabel', () => ({
  DEFAULT_LABEL_COLOR: '#D9D9D9'
}))
vi.mock('@common/utils', () => ({ hexToRgba: () => '' }))
vi.mock('@common/utils/biz', () => ({
  formatAddress: (address: string) => address
}))
vi.mock('@common/utils/chain', () => ({ classifyByChain: () => 'evm' }))

const address = '0x1111111111111111111111111111111111111111'
const key = `evm-${address}`
const label: PrivateLabel = {
  address,
  chainType: ChainType.EVM,
  label: 'PRIVATE LABEL',
  color: '#EF4444'
}

beforeEach(() => {
  vi.stubGlobal('React', React)
  state.options = { enablePrivateLabels: true, syncPhalconLabels: true }
  state.privateLabels = { [key]: { ...label } }
  state.write.mockClear()
  state.read.mockClear()
})

test.each([
  ['Etherscan', Etherscan],
  ['Solscan', Solscan],
  ['Solana Explorer', SolanaExplorer],
  ['Tronscan', Tronscan],
  ['BTC', Btc],
  ['Arkham', Arkham],
  ['DeBank', Debank]
] as const)(
  '%s hides the entire private-label UI without deleting data',
  (_, Component) => {
    const render = () => {
      state.read.mockClear()
      const markup = renderToStaticMarkup(
        <Component address={address} chainType={ChainType.EVM} />
      )
      expect(
        state.read.mock.calls.filter(([key]) => key === 'options')
      ).toHaveLength(1)
      return markup
    }
    expect(render()).toContain('PRIVATE LABEL')
    state.options.enablePrivateLabels = false
    expect(render()).toBe('')
    expect(state.privateLabels[key]).toEqual(label)
    expect(state.write).not.toHaveBeenCalled()
    state.options.enablePrivateLabels = true
    expect(render()).toContain('PRIVATE LABEL')
    state.privateLabels = {}
    expect(render()).toContain('Add Local Label')
    state.options.enablePrivateLabels = false
    expect(render()).toBe('')
  }
)

test('hidden labels remain available for management, editing and CSV export', async () => {
  state.options.enablePrivateLabels = false
  let result: ReturnType<typeof usePrivateLabels> | undefined
  function Management() {
    result = usePrivateLabels()
    return null
  }
  renderToStaticMarkup(<Management />)
  expect(result!.enablePrivateLabels).toBe(false)
  expect(result!.privateLabels[key]).toEqual(label)
  expect(result!.getPrivateLabel(ChainType.EVM, address).privateLabel).toEqual(
    label
  )
  const createObjectURL = vi.fn((blob: Blob) => `blob:${blob.size}`)
  vi.stubGlobal('window', { URL: { createObjectURL } })
  vi.stubGlobal('document', { createElementNS: () => ({ click: vi.fn() }) })
  try {
    await downloadCsv('labels', Object.values(result!.privateLabels))
    const blob = createObjectURL.mock.calls[0][0] as Blob
    expect(parse(await blob.text(), { header: true }).data).toContainEqual(
      expect.objectContaining({ address, label: 'PRIVATE LABEL' })
    )
    expect(state.write).not.toHaveBeenCalled()
  } finally {
    vi.unstubAllGlobals()
  }
})
