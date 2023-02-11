import type {
  FundFlowResponse,
  FundFlowNode,
  FundFlowEdge
} from '@common/api/types'
import { swapItem } from '@common/utils'
import { EXT_SUPPORT_WEB_LIST, DEFAULT_CHAIN_ICON } from '@common/constants'

import { NodeType } from './enum'

type FlowType = 'input' | 'output'

type AddressMap = Map<string, FundFlowNode>
const genNode = (
  mainChain: string,
  mainAddress: string,
  node: FundFlowNode
) => {
  const { address, label, id, type, selected, logo, chain } = node
  if (!selected) return ''

  return `"${id}" 
        [
          shape="${type === NodeType.CROSS_CHAIN ? 'doubleoctagon' : 'rect'}"
          style="rounded"
          color="#f8f8f8"
          fillcolor="#F9F9F9"
          fontcolor="#000"
          tooltip="${address}"
          target="_blank"
          fixedsize="true"
          width="2.9"
          height="1"
          image="${
            logo ||
            EXT_SUPPORT_WEB_LIST.find(v => v.chain === chain)?.logo ||
            DEFAULT_CHAIN_ICON
          }"
          label=<<table border="0">${
            label
              ? `<tr><td ALIGN="left" balign="left" FIXEDSIZE="true" width="40" height="15"><FONT
                COLOR="#000000"
                POINT-SIZE="12px"
              >${
                label.length > 20 ? `${label.slice(0, 20)}...` : label
              }</FONT></td></tr>`
              : ``
          }<tr><td ALIGN="left" balign="left" FIXEDSIZE="true" width="40" height="13"><FONT
              COLOR="#939393"
              FACE="Poppins-Regular"
              POINT-SIZE="12px"
              >${address.slice(
                0,
                22
              )}</FONT></td></tr><tr><td ALIGN="left" balign="left" FIXEDSIZE="true" width="40" height="13"><FONT
              COLOR="#939393"
              FACE="Poppins-Regular"
              POINT-SIZE="12px"
              >${address.slice(22, address.length)}</FONT></td></tr></table>>
        ]`
}

const genEdge = (
  edge: FundFlowEdge,
  flowType: FlowType,
  addressMap: AddressMap
) => {
  const { from, to, serial, description, selected } = edge

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
        "${fromNode.id}" -> "${toNode.id}"
        [
          title="Hh"
          dir="forward"
          class="transfer-0"
          style="solid"
          color="${themeColor}"
          labeltooltip="${fromNode.address} -> ${toNode.address}"
          edgetooltip="${fromNode.address} -> ${toNode.address}"
          label=<<table border="0">
          <tr><td align="center" width="20" bgcolor="white" cellpadding="0"><font color="${themeColor}" FACE="Poppins-Regular"><br/>[${serial}] </font></td><td align="center" cellpadding="0"><font color="#000"><br/>${description}</font></td></tr>
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
    const temp = arr.filter(item => item.from === from && item.to === to)
    if (temp.length < Math.ceil(arr.length / 2)) {
      const sourceIdx = arr.findIndex(
        item => item.to === from && item.from === to
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
    if (dot.indexOf(`${fromNode.id}`) === -1) {
      dot += genNode(chain, mainAddress, fromNode)
    }
    if (dot.indexOf(`${toNode.id}`) === -1) {
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
