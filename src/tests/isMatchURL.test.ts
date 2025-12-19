import { expect, test } from 'vitest'
import { isMatchURL } from '@common/utils/permission'

test('should match exact URL', () => {
  const url = 'https://example.com/'
  const patternList = ['https://example.com/']
  expect(isMatchURL(url, patternList)).toBe(true)
})

test('should not match different URL', () => {
  const url = 'https://example.com/'
  const patternList = ['https://example.net/']
  expect(isMatchURL(url, patternList)).toBe(false)
})

test('should match URL with wildcard', () => {
  const url = 'https://example.com/path'
  const patternList = ['https://example.com/*']
  expect(isMatchURL(url, patternList)).toBe(true)
})

test('should match URL with wildcard', () => {
  const url = 'https://example.io/path?referer=https://example.com'
  const patternList = ['https://example.com/*']
  expect(isMatchURL(url, patternList)).toBe(false)
})

test('should not match URL with different protocol', () => {
  const url = 'http://example.com/'
  const patternList = ['https://example.com/']
  expect(isMatchURL(url, patternList)).toBe(false)
})

test('should match URL with query parameters', () => {
  const url = 'https://example.com/path?a=1&b=2'
  const patternList = ['https://example.com/path?*']
  expect(isMatchURL(url, patternList)).toBe(true)
})

test('should match URL with query parameters', () => {
  const url =
    'https://www-dev.metasleuth.io/result/solana/BNLtpXLqsjDGxzB1Mmcv3NmEiQhSSWFq8JViKrrrQ8Do?referer=https%3A%2F%2Fsolscan.io%2Faccount%2FBNLtpXLqsjDGxzB1Mmcv3NmEiQhSSWFq8JViKrrrQ8Do%23splTransfers&f=md&r=auth'
  const patternList = ['*://*.metasleuth.io/*']
  expect(isMatchURL(url, patternList)).toBe(true)
})

test('should match URL with query parameters', () => {
  const url =
    'https://solscan.io/account/BNLtpXLqsjDGxzB1Mmcv3NmEiQhSSWFq8JViKrrrQ8Do#splTransfers'
  const patternList = [
    '*://cn.etherscan.com/*',
    '*://goto.etherscan.com/*',
    '*://sepolia.etherscan.io/*',
    '*://goerli.etherscan.io/*',
    '*://cn.etherscan.com/*',
    '*://etherscan.io/*',
    '*://bscscan.com/*',
    '*://goto.bscscan.com/*',
    '*://www.bscscan.com/*',
    '*://testnet.bscscan.com/*',
    '*://polygonscan.com/*',
    '*://mumbai.polygonscan.com/*',
    '*://*.moonscan.io/*',
    '*://era.zksync.network/*',
    '*://snowscan.xyz/*',
    '*://optimistic.etherscan.io/*',
    '*://*.bttcscan.com/*',
    '*://*.celoscan.io/*',
    '*://zkevm.polygonscan.com/*',
    '*://*.lineascan.build/*',
    '*://*.wemixscan.com/*',
    '*://*.basescan.org/*',
    '*://cronoscan.com/*',
    '*://gnosisscan.io/*',
    '*://*.arbiscan.io/*'
  ]
  expect(isMatchURL(url, patternList)).toBe(false)
})

test('should match URL with query parameters', () => {
  const url =
    'https://etherscan.io/address1/0xde0336765d7549fb555883eb6c85e8862b4fdc41'
  const patternList = [
    '*://cn.etherscan.com/*',
    '*://cn.etherscan.com/*',
    '*://etherscan.io/*'
  ]
  expect(isMatchURL(url, patternList)).toBe(true)
})

test('should match URL with query parameters', () => {
  const url =
    'https://basescan.org/address/0x6afce80b5c75149289839f80f24ad2dffdd46cb5'
  const patternList = ['*://*.basescan.org/*']
  expect(isMatchURL(url, patternList)).toBe(true)
})
