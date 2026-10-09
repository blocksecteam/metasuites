import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { MetaSleuthInitializer } from '@src/content/metasleuth'
import { getReturnUrl, parseToken } from '@src/content/metasleuth/validation'

const mocks = vi.hoisted(() => ({
  set: vi.fn(),
  get: vi.fn(),
  domain: 'https://metasleuth.io'
}))
vi.mock('@src/store', () => ({ store: { set: mocks.set, get: mocks.get } }))
vi.mock('@common/constants', () => ({
  MSG_MS_SUBSCRIPTION_INFO: 'msg_ms_subscription_info'
}))
vi.mock('@common/config/uri', () => ({
  get SLEUTH_DOMAIN() {
    return mocks.domain
  }
}))

const token = 'SYNTHETIC_TOKEN'
const target = 'https://solscan.io/account/test?value=%26#splTransfers'
let receiver: ((event: MessageEvent) => Promise<void>) | undefined
let page: {
  location: { origin: string; assign: ReturnType<typeof vi.fn> }
  addEventListener: ReturnType<typeof vi.fn>
}
let readToken: ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.resetAllMocks()
  mocks.domain = 'https://metasleuth.io'
  mocks.set.mockResolvedValue(undefined)
  mocks.get.mockResolvedValue(token)
  receiver = undefined
  page = {
    location: { origin: mocks.domain, assign: vi.fn() },
    addEventListener: vi.fn((_type, listener) => {
      receiver = listener
    })
  }
  readToken = vi.fn(() => JSON.stringify(token))
  vi.stubGlobal('window', page)
  vi.stubGlobal('localStorage', { getItem: readToken })
  vi.spyOn(console, 'error').mockImplementation(() => undefined)
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

function event(
  data: unknown = { type: 'msg_ms_subscription_info', data: { url: target } }
) {
  return {
    source: page,
    origin: page.location.origin,
    data
  } as unknown as MessageEvent
}

function init() {
  new MetaSleuthInitializer().init()
  expect(receiver).toBeDefined()
  return receiver!
}

function expectIgnored() {
  expect(readToken).not.toHaveBeenCalled()
  expect(mocks.set).not.toHaveBeenCalled()
  expect(mocks.get).not.toHaveBeenCalled()
  expect(page.location.assign).not.toHaveBeenCalled()
}

test.each([
  'https://solscan.io/account/test?value=%26#splTransfers',
  'https://explorer.solana.com/address/test?cluster=devnet',
  'https://etherscan.io/address/test',
  'https://robin.etherscan.io/address/test',
  'https://sepolia.basescan.org/address/test',
  'https://tronscan.org/#/address/test',
  'https://www.tronscan.org/#/address/test',
  'https://solscan.io:443/account/test'
])('accepts supported HTTPS return URL: %s', url => {
  expect(getReturnUrl(url)).toBe(new URL(url).href)
})

test.each([
  null,
  undefined,
  1,
  {},
  [],
  '',
  '   ',
  '/account/test',
  '//solscan.io/account/test',
  'http://solscan.io/account/test',
  'javascript:alert(1)',
  'data:text/html,test',
  'blob:https://solscan.io/test',
  'https://attacker.invalid/',
  'https://metasleuth.io/',
  'https://debank.com/',
  'https://app.blocksec.com/phalcon/explorer',
  'https://solscan.io.evil.com/',
  'https://evilsolscan.io/',
  'https://evilbasescan.org/',
  'https://evil.com?.basescan.org/',
  'https://evil.com#.basescan.org/',
  'https://evil.com/?url=https://solscan.io/',
  'https://solscan.io@evil.com/',
  'https://evil.com@solscan.io/',
  'https://user:pass@solscan.io/',
  'https://solscan.io:8443/'
])('rejects unsafe return URL: %j', url => {
  expect(getReturnUrl(url)).toBeNull()
})

test.each([
  [JSON.stringify(token), token],
  [token, token],
  [JSON.stringify('escaped"\\token'), 'escaped"\\token'],
  [null, null],
  ['', null],
  ['   ', null],
  ['""', null],
  ['"  "', null],
  ['null', null],
  ['123', null],
  ['true', null],
  ['{}', null],
  ['[]', null]
])('decodes token without accepting non-string JSON: %j', (raw, expected) => {
  expect(parseToken(raw)).toBe(expected)
})

test('saves and reads back token before returning, without f/r/referer/plan', async () => {
  await init()(event())
  expect(readToken).toHaveBeenCalledWith('blocksec_token')
  expect(mocks.set).toHaveBeenCalledWith('token', token)
  expect(mocks.get).toHaveBeenCalledWith('token')
  expect(page.location.assign).toHaveBeenCalledWith(target)
  expect(mocks.set.mock.invocationCallOrder[0]).toBeLessThan(
    mocks.get.mock.invocationCallOrder[0]
  )
  expect(mocks.get.mock.invocationCallOrder[0]).toBeLessThan(
    page.location.assign.mock.invocationCallOrder[0]
  )
})

test('accepts development origin only when configured', async () => {
  mocks.domain = 'https://www-dev.metasleuth.io'
  page.location.origin = mocks.domain
  await init()(event())
  expect(page.location.assign).toHaveBeenCalledWith(target)
})

test.each([
  'http://metasleuth.io',
  'https://www-dev.metasleuth.io',
  'https://untrusted.metasleuth.io',
  'https://metasleuth.io:8443',
  'https://metasleuth.io.evil.com'
])('does not install receiver on unconfigured origin: %s', origin => {
  page.location.origin = origin
  new MetaSleuthInitializer().init()
  expect(page.addEventListener).not.toHaveBeenCalled()
  expectIgnored()
})

test.each([{}, null])('rejects other window or missing source: %j', source => {
  const receive = init()
  return receive({ ...event(), source } as MessageEvent).then(expectIgnored)
})

test('rejects cross-origin message even with same window source', async () => {
  await init()({ ...event(), origin: 'https://attacker.invalid' })
  expectIgnored()
})

test.each([
  null,
  undefined,
  'msg_ms_subscription_info',
  [],
  42,
  {},
  { type: 'login', data: { url: target } },
  { type: 'msg_ms_subscription_info' },
  { type: 'msg_ms_subscription_info', data: null },
  { type: 'msg_ms_subscription_info', data: [] },
  { type: 'msg_ms_subscription_info', data: {} },
  { type: 'msg_ms_subscription_info', data: { url: '' } },
  {
    type: 'msg_ms_subscription_info',
    data: { url: 'https://attacker.invalid/' }
  }
])(
  'ignores malformed or unsafe messages without accessing token: %j',
  async data => {
    await init()({ ...event(), data })
    expectIgnored()
  }
)

test.each([null, '""', '{}'])(
  'does not write or navigate with invalid token: %j',
  async raw => {
    readToken.mockReturnValue(raw)
    await init()(event())
    expect(mocks.set).not.toHaveBeenCalled()
    expect(page.location.assign).not.toHaveBeenCalled()
  }
)

test('does not navigate when token readback differs', async () => {
  mocks.get.mockResolvedValue('OLD_TOKEN')
  await init()(event())
  expect(mocks.set).toHaveBeenCalledWith('token', token)
  expect(page.location.assign).not.toHaveBeenCalled()
})

test.each(['localStorage', 'set', 'get'])(
  'handles %s failure without navigation and permits retry',
  async stage => {
    const receive = init()
    const error = new Error('SYNTHETIC_FAILURE')
    if (stage === 'localStorage')
      readToken.mockImplementationOnce(() => {
        throw error
      })
    if (stage === 'set') mocks.set.mockRejectedValueOnce(error)
    if (stage === 'get') mocks.get.mockRejectedValueOnce(error)
    await receive(event())
    expect(page.location.assign).not.toHaveBeenCalled()
    await receive(event())
    expect(page.location.assign).toHaveBeenCalledWith(target)
  }
)

test('waits for write and readback, ignoring duplicate messages while pending', async () => {
  let finishWrite!: () => void
  let finishRead!: (value: string) => void
  mocks.set.mockImplementation(
    () =>
      new Promise<void>(resolve => {
        finishWrite = resolve
      })
  )
  mocks.get.mockImplementation(
    () =>
      new Promise<string>(resolve => {
        finishRead = resolve
      })
  )
  const receive = init()
  const first = receive(event())
  await receive(event())
  expect(mocks.set).toHaveBeenCalledTimes(1)
  expect(mocks.get).not.toHaveBeenCalled()
  expect(page.location.assign).not.toHaveBeenCalled()
  finishWrite()
  await Promise.resolve()
  expect(mocks.get).toHaveBeenCalledTimes(1)
  expect(page.location.assign).not.toHaveBeenCalled()
  await receive(event())
  expect(mocks.set).toHaveBeenCalledTimes(1)
  finishRead(token)
  await first
  expect(page.location.assign).toHaveBeenCalledWith(target)
})
