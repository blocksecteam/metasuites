import type {
  FundFlowResponse,
  FundFlowNode,
  FundFlowEdge
} from '@common/api/types'
import { insertStr, swapItem, getScanAddressHref } from '@common/utils'
import { SUPPORT_WEB_LIST } from '@common/constants'

import { NodeType } from './enum'

type FlowType = 'input' | 'output'

type AddressMap = Map<number, FundFlowNode>

const getFullNameByChain = (chain: string) => {
  const item = SUPPORT_WEB_LIST.find(item => item.chain === chain)
  return item?.fullName ?? item?.name ?? ''
}

const genNode = (
  mainChain: string,
  mainAddress: string,
  node: FundFlowNode
) => {
  const { address, label, id, chain, type, selected, showIndex, index } = node
  if (!selected) return ''
  const href = getScanAddressHref(chain, address)

  /** center point line break */
  const _address =
    address.toLowerCase() === mainAddress.toLowerCase() && mainChain === chain
      ? insertStr(address, 24, '\n')
      : mainChain === chain
      ? address
      : `${getFullNameByChain(chain)} \n ${address}`

  return `"${id}-${address}" 
        [
          shape="${type === NodeType.CROSS_CHAIN ? 'diamond' : 'rect'}"
          style="filled"
          color="#FFFFFF"
          fillcolor="#F9F9F9"
          fontcolor="#000"
          label=<<table border="0">
          <tr>${
            showIndex
              ? `<td align="center" width="16px" height="16px" fixedsize="true" color="#000000" style="rounded" border="1" cellpadding="0">${index}</td>`
              : ``
          }<td align="center" cellpadding="0"><font color="#000">  ${
    label || _address
  }</font></td></tr>
          </table>>
          tooltip="${address}"
          href="${href}"
          target="_blank"
        ]`
}

const genEdge = (
  edge: FundFlowEdge,
  flowType: FlowType,
  addressMap: AddressMap
) => {
  const { from, to, id, description, selected } = edge

  const themeColor = flowType === 'output' ? '#00A54C' : '#7262FD'

  const fromNode = addressMap.get(from)
  const toNode = addressMap.get(to)
  if (
    !fromNode ||
    !toNode ||
    !fromNode.selected ||
    !toNode.selected ||
    !selected
  )
    return ''

  return `
        "${fromNode.id}-${fromNode.address}" -> "${toNode.id}-${toNode.address}"
        [
          title="Hh"
          dir="forward"
          class="transfer-0"
          style="solid"
          color="${themeColor}"
          labeltooltip="${fromNode.address} -> ${toNode.address}"
          edgetooltip="${fromNode.address} -> ${toNode.address}"
          label=<<table border="0">
          <tr><td align="center" width="20" bgcolor="white" cellpadding="0"><font color="${themeColor}"><br/>[${id}] </font></td><td align="center" cellpadding="0"><font color="#000"><br/>${description}</font></td></tr>
          </table>>
        ]
      `
}

const sort = (edges: FundFlowEdge[]) => {
  const groupMap = edges.reduce((acc: Record<string, FundFlowEdge[]>, item) => {
    const key = `${item.from}-${item.to}`
    const keyReverse = `${item.to}-${item.from}`
    if (acc[key]) {
      acc[key].push(item)
    } else if (acc[keyReverse]) {
      acc[keyReverse].push(item)
    } else {
      acc[key] = [item]
    }
    return acc
  }, {})
  const result: FundFlowEdge[] = []
  for (const key in groupMap) {
    let arr = groupMap[key]
    const [from, to] = key.split('-')
    const temp = arr.filter(
      item => item.from === Number(from) && item.to === Number(to)
    )
    if (temp.length < Math.ceil(arr.length / 2)) {
      const sourceIdx = arr.findIndex(
        item => item.to === Number(from) && item.from === Number(to)
      )
      arr = swapItem<FundFlowEdge>(arr, sourceIdx, 0)
    }
    result.push(...arr)
  }
  return result
}

/**
 *
 * @param chain: determine if it's the same chain
 * @param mainAddress：determine whether the edge is input or output
 * @param fundFlow：data source
 */
const genDotStr = (
  chain: string,
  mainAddress: string,
  fundFlow: FundFlowResponse
) => {
  const sortedEdges = sort(fundFlow.edges).filter(edge => edge.selected)
  const addressMap: AddressMap = new Map()

  let dot = `
      digraph "" {
        rankdir="LR"
        node [style="filled"]
    `
  fundFlow.nodes.forEach(item => {
    addressMap.set(item.id, item)
  })

  const mainAddressId = fundFlow.nodes.find(
    item => item.address.toLowerCase() === mainAddress.toLowerCase()
  )?.id

  /** It cannot be taken directly from nodes, because it is necessary to ensure the basic order of the drawn connections.
   *  The data nodes in edges are already sorted
   */
  sortedEdges.forEach(item => {
    const fromNode: FundFlowNode = addressMap.get(item.from)!
    const toNode: FundFlowNode = addressMap.get(item.to)!
    if (dot.indexOf(`${fromNode.id}-${fromNode.address}`) === -1) {
      dot += genNode(chain, mainAddress, fromNode)
    }
    if (dot.indexOf(`${toNode.id}-${toNode.address}`) === -1) {
      dot += genNode(chain, mainAddress, toNode)
    }
  })

  sortedEdges.forEach(item => {
    const flowType: FlowType = mainAddressId === item.from ? 'output' : 'input'
    dot += genEdge(item, flowType, addressMap)
  })
  dot += '}'
  return dot
}

export default genDotStr
