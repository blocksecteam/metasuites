import { readFileSync } from 'node:fs'
import ts from 'typescript'
import { expect, test, vi } from 'vitest'

const source = ts.createSourceFile(
  'index.tsx',
  readFileSync(
    new URL('../common/components/ModalFundFlow/index.tsx', import.meta.url),
    'utf8'
  ),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX
)

function find(
  node: ts.Node,
  predicate: (node: ts.Node) => boolean
): ts.Node | undefined {
  if (predicate(node)) return node
  return ts.forEachChild(node, child => find(child, predicate))
}

function compile(expression: ts.Node, bindings: Record<string, unknown>) {
  const code = ts.transpileModule(
    `const callback = ${expression.getText(source)}`,
    {
      compilerOptions: { target: ts.ScriptTarget.ES2020 }
    }
  ).outputText
  return new Function(...Object.keys(bindings), `${code}; return callback`)(
    ...Object.values(bindings)
  )
}

test.each([true, false])(
  'fund-flow response respects visibility=%s without changing the public label',
  enabled => {
    const mapping = find(
      source,
      node =>
        ts.isCallExpression(node) &&
        node.expression.getText(source) === 'res.data?.nodes.map'
    ) as ts.CallExpression
    const mapNode = compile(mapping.arguments[0], {
      addressOptions: [],
      getPrivateLabel: () => ({
        privateLabel: { label: 'Private' },
        color: '#EF4444'
      }),
      classifyByChain: () => 'evm',
      enablePrivateLabels: enabled
    })
    const node = { id: 'n', chain: 'eth', address: 'address', label: 'Public' }
    expect(mapNode(node, 0)).toMatchObject({
      label: enabled ? 'Private' : 'Public',
      color: enabled ? '#EF4444' : '#f8f8f8',
      selected: true
    })
    expect(node.label).toBe('Public')
  }
)

test('editing while display is disabled does not write a private label into the graph', () => {
  const attribute = find(
    source,
    node => ts.isJsxAttribute(node) && node.name.getText(source) === 'onSuccess'
  ) as ts.JsxAttribute
  const expression = (attribute.initializer as ts.JsxExpression).expression!
  const setFundFlow = vi.fn()
  const getFundFlow = vi.fn()
  const callback = compile(expression, {
    enablePrivateLabels: false,
    setFundFlow,
    getFundFlow
  })
  callback('Private', '#EF4444')
  callback('', '')
  expect(setFundFlow).not.toHaveBeenCalled()
  expect(getFundFlow).not.toHaveBeenCalled()
})
