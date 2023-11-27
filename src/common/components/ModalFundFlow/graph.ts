import { select, selectAll } from 'd3-selection'
import type { Selection, BaseType } from 'd3-selection'
import Big from 'big.js'
import * as d3 from 'd3'

import type { FundFlowNode, FundFlowRes } from '@common/api/types'
import { getImageUrl, saveAsSvg, saveSvgAsPng } from '@common/utils'
import { SLEUTH_DOMAIN } from '@common/config/uri'
import {
  EXT_SUPPORT_WEB_LIST,
  DEFAULT_CHAIN_ICON,
  SLEUTH_SUPPORT_LIST
} from '@common/constants'

const analyzeLogo = getImageUrl('analyze')

export const GRAPH_TEMP = 'GRAPH_TEMP'
const NODE_HOVER_HEIGHT = 32
const IMAGE_CENTER_TO_LEFT_PX = 85
export const formatLabel = (label: string) => {
  return label.length > 20 ? `${label.slice(0, 20)}...` : label
}

export const nodeHover = (
  ele: Selection<BaseType, unknown, null, undefined>,
  key: string,
  nodeData: FundFlowNode
) => {
  const isSupportChain =
    SLEUTH_SUPPORT_LIST.findIndex(chain => chain === key.split('-')[0]) !== -1

  clearGraphTemp()

  // const nodeA = ele.select('a')

  const nodeAClone: Selection<BaseType, unknown, null, undefined> =
    ele.clone(true)

  nodeAClone.classed('pointer', true).on('click', function () {
    window.open(nodeData.url)
  })

  nodeAClone.selectAll('text').each(function (_: any, index: number) {
    if (nodeData?.label) {
      if (index === 0) {
        select(this).text(`${formatLabel(nodeData.label)}`)
      }

      if (index === 1) {
        select(this).text(`${nodeData.address.slice(0, 22)}`)
      }

      if (index === 2) {
        select(this).text(
          `${nodeData.address.slice(22, nodeData.address.length)}`
        )
      }
    } else {
      if (index === 0) {
        select(this).text(`${nodeData.address.slice(0, 22)}`)
      }

      if (index === 1) {
        select(this).text(
          `${nodeData.address.slice(22, nodeData.address.length)}`
        )
      }
    }
  })

  const imgPosition = {
    analyze: {
      x: '',
      y: ''
    }
  }

  nodeAClone?.selectAll('path').each(function () {
    const dom = select(this)

    const pathList = (dom.attr('d') as string)
      ?.split(' ')
      .map(v => v.split(','))

    const _m = [pathList[0][0].split('M')[1], pathList[0][1].split('C')[0]]
    const _c = [pathList[0][1].split('C')[1], pathList[0][2]]

    pathList.shift()
    pathList.unshift(_c)
    pathList.unshift(_m)

    if (pathList?.length === 25) {
      // common nodes
      isSupportChain &&
        pathList.forEach((v, i) => {
          // extended bottom
          if (i >= 8 && i <= 19) {
            v[1] = `${Number(v[1]) + NODE_HOVER_HEIGHT}`
          }
        })

      imgPosition.analyze.x = `${Number(pathList[8][0]) + 12}`
      imgPosition.analyze.y = `${Number(pathList[8][1]) - 30}`
    }

    if (pathList?.length === 49) {
      // cross chain nodes
      const _y = Number(pathList[0][1]) - Number(dom.attr('stroke-width'))
      isSupportChain &&
        pathList.forEach((v, i) => {
          // extended bottom
          if (i >= 25 || i === 1 || i === 0) {
            v[1] = `${Number(_y) + NODE_HOVER_HEIGHT * 2}`
          }
        })

      imgPosition.analyze.x = `${Number(pathList[25][0]) + 15}`
      imgPosition.analyze.y = `${Number(pathList[25][1]) - 45}`
    }

    dom.attr(
      'd',
      pathList
        ?.reduce((pre, cur, index) => {
          if (index === 0) {
            cur[0] = 'M' + cur[0]
          }
          if (index === 1) {
            cur[0] = 'C' + cur[0]
          }

          return pre + ' ' + cur.join(',')
        }, '')
        .trim()
    )
  })

  nodeAClone.classed(GRAPH_TEMP, true)

  isSupportChain &&
    nodeAClone
      .append('image')
      .attr('href', `${analyzeLogo}`)
      .attr('x', imgPosition.analyze.x)
      .attr('y', imgPosition.analyze.y)
      .attr('width', '190px')
      .attr('height', '40px')
      .on('click', function () {
        d3.event.stopPropagation()
        window.open(
          `${SLEUTH_DOMAIN}/result/${nodeData.chain}/${nodeData.address}`
        )
      })

  select('#graph0')?.append(() => {
    return nodeAClone.node()
  })

  nodeAClone.on('mouseleave', () => {
    clearGraphTemp()
  })
}

export const nodeStrokeWidthChange = (
  ele: Selection<BaseType, unknown, null, undefined>,
  color: string,
  width: string
) => {
  ele.selectAll('path').each(function (_: any, index: number) {
    if (index === 0) {
      select(this).attr('stroke', color)
      select(this).attr('stroke-width', width)
    } else {
      select(this).attr('stroke', color)
    }
  })
}

export const clearGraphTemp = () => {
  select(`.${GRAPH_TEMP}`).each(function () {
    select(this).remove()
  })
}

export const initNodes = (fundFlow: FundFlowRes) => {
  const nodes = selectAll('#graph0  .node')

  nodes.each(function (d3Ele: any) {
    const node = select(this)

    node.select('path').attr('fill', '#f8f8f8')

    // Initializes the position of the image
    const _image = node.select('image')
    if (_image) {
      const _x = _image?.attr('x') ?? 0
      _image?.attr('x', `${Number(_x) - IMAGE_CENTER_TO_LEFT_PX}`)
    }

    // Initializes the position of the text
    node.selectAll('text').each(function () {
      select(this).attr('x', Number(select(this).attr('x')) - 48)
    })

    node.on('mouseenter', () => {
      const item = fundFlow.nodes.find(v => v.id === d3Ele.key)!

      nodeStrokeWidthChange(node, '#00a54c', '3')

      nodeHover(node, d3Ele.key, item)
    })

    node.on('mouseleave', () => {
      nodeStrokeWidthChange(node, '#f8f8f8', '1')
    })
  })
}

export const onDownload = (
  type: 'svg' | 'png',
  mainAddress: string,
  enableWatermark: boolean
) => {
  const svg = document
    .querySelector<HTMLElement>('#graph > svg')
    ?.cloneNode(true)

  const svgParentEl = document.querySelector<HTMLElement>('#graph')
  /** download as svg with watermark */
  if (svgParentEl && svg) {
    const watermarkWidth = 262
    const watermarkHeight = 57
    const polygonEl = (svg as HTMLElement).getElementsByTagName('polygon')[0]
    const viewBoxWidth = (svg as HTMLElement)
      .getAttribute('viewBox')
      ?.split(' ')?.[2]
    if (viewBoxWidth) {
      let imagePosX = viewBoxWidth
      try {
        imagePosX = new Big(viewBoxWidth).sub(watermarkWidth).toFixed()
      } catch (e) {
        console.log(e)
      }
      if (enableWatermark && polygonEl) {
        polygonEl.insertAdjacentHTML(
          'afterend',
          `<a id="watermark" href="https://blocksec.com/metadock" target="_blank" rel="noreferrer">
            <image x="${imagePosX}" y="-60" style="opacity: 0.2" xlink:href="data:image/png;base64,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" width="${watermarkWidth}" height="${watermarkHeight}"/>
        </a>`
        )
      }
      if (type === 'svg') saveAsSvg(svg, mainAddress)
      if (type === 'png') saveSvgAsPng(svg, mainAddress)
    }
  }
}

export const toggleShowAddressIdx = (
  show: boolean,
  displayAddressOptions: FundFlowNode[]
) => {
  d3.selectAll('.node').each(function (d: unknown) {
    const text = d3.select(this).select('text').text()
    const nodeId = (d as any).key
    const node = displayAddressOptions.find(item => item.id === nodeId)
    if (node) {
      const idx = node.index
      const originText = node.label
        ? formatLabel(node.label)
        : node.address.slice(0, 22)
      d3.select(this)
        .select('text')
        .text(show ? `${idx} ${text}` : originText)
    }
  })
}

export const getFundFlowImages = (fundFlow?: FundFlowRes) => {
  return [
    ...Array.from(new Set(fundFlow?.nodes?.map(v => v.logo))),
    ...EXT_SUPPORT_WEB_LIST.map(v => v.logo),
    DEFAULT_CHAIN_ICON
  ].filter(item => !!item)
}
