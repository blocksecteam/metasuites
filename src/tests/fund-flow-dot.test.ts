import { createRequire } from 'node:module'
import { expect, test, vi } from 'vitest'

import type { FundFlowEdge, FundFlowRes } from '@common/api/types'
import genDotStr from '@common/components/ModalFundFlow/dot'
import { codeHTMLEntities } from '@common/utils/str'

vi.mock('@common/utils', async () => {
  const { codeHTMLEntities } = await import('@common/utils/str')
  return {
    codeHTMLEntities,
    decodeUnicode: (text: string) => text,
    swapItem: (items: unknown[]) => items,
    ChainUtils: { getChainLogo: () => '' },
    getContrastColor: () => '#000000'
  }
})

const require = createRequire(import.meta.url)
const renderSvg = require('viz.js') as (
  dot: string,
  options: { format: string }
) => string

const address = '0x1111111111111111111111111111111111111111'

function graph(description: string, serial = 1) {
  const fundFlow: FundFlowRes = {
    nodes: ['node-a', 'node-b'].map((id, index) => ({
      id,
      address: index ? '0x2222222222222222222222222222222222222222' : address,
      chain: 'eth',
      label: '',
      type: 1,
      isContract: false,
      url: '',
      color: '#ffffff',
      selected: true
    })),
    edges: [
      {
        from: 'node-a',
        to: 'node-b',
        serial,
        description,
        token: '',
        tokenLabel: 'ETH',
        amount: '1',
        isCreate: false,
        tokenLink: '',
        ts: '',
        selected: true
      }
    ]
  }
  const dot = genDotStr(address, fundFlow)
  return { dot, svg: renderSvg(dot, { format: 'svg' }) }
}

const descriptions = [
  '</font></td></tr></table>> URL="javascript:window.__auditExecuted=1" label=<<table><tr><td><font>Audit link',
  '</font></td></tr></table>> ]; "injected" [URL="https://example.invalid", label="injected"]; "node-a" -> "node-b" [label=<<table><tr><td><font>extra',
  '<TABLE HREF="javascript:alert(1)"><TR><TD>CLICK</TD></TR></TABLE>',
  '<IMG SRC="https://example.invalid/tracker.png"/>',
  '&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&gt; URL=&quot;javascript:alert(1)&quot;',
  '&#60;TABLE HREF=&#34;javascript:alert(1)&#34;&#62;',
  '\\u003cTABLE HREF="javascript:alert(1)"\\u003e',
  '1 ETH & 2 USDC < 3 "tokens" / 用户的\'标签',
  'first line\nsecond line'
]

test.each(descriptions)(
  'renders description as text without DOT injection: %j',
  description => {
    const { dot, svg } = graph(description)
    expect(dot).toContain(`<br/>${codeHTMLEntities(description)}</font>`)
    expect(svg).not.toMatch(/<[^>]+\s(?:xlink:)?href\s*=|<image\b|<script\b/i)
    expect(svg.match(/class="node"/g)).toHaveLength(2)
    expect(svg.match(/class="edge(?:\s[^"]*)?"/g)).toHaveLength(1)
  }
)

test('preserves ordinary transfer descriptions', () => {
  const { svg } = graph('1.25 ETH', 7)
  expect(svg).toContain('1.25 ETH</text>')
  expect(svg).toContain('[7] </text>')
})

test('treats an unexpected string serial from the API as text', () => {
  const serial = descriptions[0] as unknown as FundFlowEdge['serial']
  const { dot, svg } = graph('1 ETH', serial)
  expect(dot).toContain(`[${codeHTMLEntities(String(serial))}]`)
  expect(svg).not.toMatch(/<[^>]+\s(?:xlink:)?href\s*=/i)
  expect(svg.match(/class="node"/g)).toHaveLength(2)
})
