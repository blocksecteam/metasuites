import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { getSolscanAccountAddress } from '@src/content/solscan/account-link'
import { renderAddressLabels } from '@src/content/solscan/feat-scripts/address-labels'

const mocks = vi.hoisted(() => ({
  emit: vi.fn(),
  merge: vi.fn(),
  root: vi.fn()
}))
vi.mock('@common/event', () => ({ chromeEvent: { emit: mocks.emit } }))
vi.mock('@common/utils', () => ({
  mergeAddressLabels: mocks.merge,
  getSubStr: (text: string) => text
}))
vi.mock('@common/constants', () => ({
  GET_ADDRESS_LABELS: 'labels',
  ChainType: { SOLANA: 'solana' }
}))
vi.mock('@common/components', () => ({ TokenSymbol: () => null }))
vi.mock('react-dom/client', () => ({ createRoot: mocks.root }))

const address = '5m1hrmwvGWgkMUfGE4LKkdVCcxa9W1sC2dhAdWK6sAbR'
const other = '3k8TNKsU3kNz1ER2okkY7LPzp92mwzYij4BBKQMd9RTk'
const page = 'https://solscan.io/tx/test'

test.each([
  `/account/${address}`,
  `https://solscan.io/account/${address}`,
  `/account/${address}/?cluster=devnet#tab`,
  `https://SOLSCAN.IO/account/${address}`
])('extracts the full case-sensitive account address: %s', href => {
  expect(getSolscanAccountAddress(href, page)).toBe(address)
})

test.each([
  null,
  '',
  '/tx/test',
  `/account/${address}/extra`,
  `/account/${address}%2Fextra`,
  `/account/${address}1`,
  `/account/${'1'.repeat(31)}`,
  `/account/${'0'.repeat(32)}`,
  `https://evil.com/account/${address}`,
  `https://solscan.io.evil.com/account/${address}`,
  `https://user@solscan.io/account/${address}`,
  `http://solscan.io/account/${address}`,
  `https://solscan.io:8443/account/${address}`,
  `/?target=/account/${address}`,
  `javascript:alert(1)`
])('rejects misleading or invalid account links: %s', href => {
  expect(getSolscanAccountAddress(href, page)).toBeNull()
})

test('rejects a non-Solscan page and preserves existing HTTP same-origin matching', () => {
  expect(
    getSolscanAccountAddress(`/account/${address}`, 'https://evil.com/')
  ).toBeNull()
  expect(
    getSolscanAccountAddress(`/account/${address}`, 'http://solscan.io/tx/test')
  ).toBe(address)
})

beforeEach(() => {
  vi.resetAllMocks()
  mocks.emit.mockResolvedValue({ success: true, data: [] })
  mocks.merge.mockResolvedValue([])
  vi.stubGlobal('window', { location: { href: page } })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const anchor = (href: string) => ({
  getAttribute: () => href,
  isConnected: false
})

test('deduplicates addresses and merges local labels on a successful empty API response', async () => {
  vi.stubGlobal('document', {
    querySelectorAll: () => [
      anchor(`/account/${address}`),
      anchor(`/account/${address}`),
      anchor(`/account/${other}`),
      anchor('https://evil.com/')
    ]
  })
  await renderAddressLabels('a[href]')
  expect(mocks.emit).toHaveBeenCalledWith('labels', {
    chain: 'solana',
    addresses: [address, other]
  })
  expect(mocks.merge).toHaveBeenCalledTimes(1)
  const predicate = mocks.merge.mock.calls[0][2]
  expect(predicate({ address })).toBe(true)
  expect(predicate({ address: 'unrelated' })).toBe(false)
  expect(mocks.root).not.toHaveBeenCalled()
})

test('does not fetch when no valid account links exist', async () => {
  vi.stubGlobal('document', { querySelectorAll: () => [anchor('/tx/test')] })
  await renderAddressLabels('a[href]')
  expect(mocks.emit).not.toHaveBeenCalled()
})

test('keeps failed API responses from modifying the page', async () => {
  mocks.emit.mockResolvedValue({ success: false })
  vi.stubGlobal('document', {
    querySelectorAll: () => [anchor(`/account/${address}`)]
  })
  await renderAddressLabels('a[href]')
  expect(mocks.merge).not.toHaveBeenCalled()
  expect(mocks.root).not.toHaveBeenCalled()
})

test('does not render a response after navigation', async () => {
  let finish!: (value: unknown) => void
  mocks.emit.mockImplementation(
    () =>
      new Promise(resolve => {
        finish = resolve
      })
  )
  vi.stubGlobal('document', {
    querySelectorAll: () => [
      { ...anchor(`/account/${address}`), isConnected: true }
    ]
  })
  mocks.merge.mockResolvedValue([{ address, label: 'SHOULD_NOT_RENDER' }])
  const pending = renderAddressLabels('a[href]')
  window.location.href = 'https://solscan.io/tx/new'
  finish({ success: true, data: [] })
  await pending
  expect(mocks.root).not.toHaveBeenCalled()
})
