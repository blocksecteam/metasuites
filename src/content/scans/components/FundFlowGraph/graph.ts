import { select, selectAll } from 'd3-selection'
import type { Selection, BaseType } from 'd3-selection'
import Big from 'big.js'
import * as d3 from 'd3'

import type { FundFlowNode, FundFlowResponse } from '@common/api/types'
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
export const GRAPH_DEFAULT_WIDTH = 800
export const GRAPH_DEFAULT_HEIGHT = 600

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

  const nodeA = ele.select('a')

  const nodeAClone: Selection<BaseType, unknown, null, undefined> =
    nodeA.clone(true)

  nodeAClone.classed('pointer', true)

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

      imgPosition.analyze.x = `${Number(pathList[8][0]) + 10}`
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

  nodeAClone.on('click', function () {
    if (nodeData.url) window.open(nodeData.url)
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

export const initNodes = (fundFlow: FundFlowResponse) => {
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
      nodeStrokeWidthChange(node, '#00a54c', '3')

      nodeHover(node, d3Ele.key, fundFlow!.nodes.find(v => v.id === d3Ele.key)!)
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
    const viewBoxWidth =
      (svg as HTMLElement).getAttribute('viewBox')?.split(' ')?.[2] ??
      GRAPH_DEFAULT_WIDTH
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
            <image x="${imagePosX}" y="-60" style="opacity: 0.2" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgwAAAByCAYAAAA/MYmXAAAAAXNSR0IArs4c6QAAIABJREFUeF7tXQd4HMX9fbN3J0su9IBM+VNCgiTbdAglBBtMs3UiQEInCSnoZCBASCAQkjg9IYRu65SQRrApTgjoZFNSIKEEQo3BOtFMx6ZjbCzZ0u38v7e3e9pbbbu7PVmyZ76PL7Fudsqb2Zm3vyqgikJAITD8CMxvvh0SLRDiTUj5UcQDeB+JusNx/IL3Atud1zIb0L8fWK/cCom6CTh+wapyH1fPKQQUAiMHATFyhqJGohDYgBCwCAPwJBJ1h4a63MPCMz95EqQ8P5A03Nj8feiYHbbZsuopwuAGWwJAf1l4qocUAusQAUUY1iH4qusNGIFBwkAQoicNNyZPhsR5iNce4UpGqk4WxDMQeB3x2qPLkDB8HsDPHbvjHQBZAL8w/9f+83QAHQBuAXDRMO2qMQC6AbwB4KAQfY4DcDmAIwD8H4BXAfwLwDcAcG6qKARGPAKKMIz4JVIDXC8RKCYMgBBPIF47PVJJgxdpmJ/8HqT8QfVwFc+gNjENff2XIVHbWgZh+AqA6wDoAAYAaADi5nhXA2gE8Ipt/EcDuA3AbwF8tXrzKmq5DgDHwoufBMCvcPz/BbAXgA8ALAawJ4DxAF4H8Cnzf4dp6KobhUB5CCjCUB5u6imFQGUIOAkDW6sGaZjXcgqEPLcgaZjX8l1A/2Flg/d5WuBZjKmZiuNuXYZ5yXkVEgZKDE4we/sEgPsBbGmSApIDq4QlDFsBiAFYBkAGYFALoB7AcgB9LnVLIQz7A3gQwAsAJgFYA6AGwD8AfBrATwBc4jEeSjI459dCjJnnOcdMkvV21dZYNbzBIqAIwwa79Gri6xQBN8JQbdIA+TfIKorsSRaENg0ndVJMj4gJA1v8GwCqH44EcFcJhOFgU2Kxs/kMpQJnA7jdZQ+QUFwD4MsAeFlTyvFXALMAvGWr7yQMfG4+gOMALARAtcpas/40AP8E8K5JGN40/749AI6NxqldjrFQKnE1gK+Z5GIFgL8DOMdDGkFVB9UybJOF5OR8jzmu062vOh+9CCjCMHrXTo18NCPgRRiMOYnHgQnTccr89yOb4vzknyElL7PqFCdZiIYwPATgKlMlsTeArwP4n2kzQHWAVfwkDAea5IKGhreaKoEvAOC/Pweg0wHIPAAnA3jAvMQPB8AL/zEA+9i+8u2EYUcANwA40WzPThbYPO0XaH+xHQB6xJDskPzcCeAljwW50iQH95iEZQ8Ap5t2E1RnUEphlUNMksK/XWv212oSDY79vuosump1Q0NAEYYNbcXVfEcGAr6EIWLScGPzJdDxo6pNXOA5CG1qQbJgdVS5SsI55Jwpvv+p48L0IwxUBVAlQNsGS41BEsBL+2UAO9g6OcAkCjRm3M0U7VN1QBUOCcKltq97izBQmsJL/RTzYqcKxc0DgmoFkgCOdaytT46DRIBqEqtsY6ogegDsa2tvjin5YB9U11jlCQC7A+C8SERYjgEwFcB/ANxUtbVXDW9QCCjCsEEtt5rsiEEgkDBERBrmJ78DKX9ctXl7kQV2WDlh4GX/K3PsvHB5CfJS5Nf8abY5eREGnm/86qZ4fyPTSNF6jDr+LQDQrsFSNVDcz0v9lwAuCMDMIgxWNdo6kHzYv/zdmqCag3YLhwKgcSfntQTAFJv04lgAf/Hpn4TpO+bvlJTQxoL/UZKhikKgaggowlA1aFXDCgEfBEIRBuP5x4CNDitLPTEcZCFeNw3HL6Cl/9BSOWGwGz2yfXojUCrAQFATQhIGXqQkDLzgaQxoFdoTbGZe2JaBIO0aaDdAkvLNkISBEoanTSJzhekm6XyURIcqFao5Ftl+pCSBKgl6gFiulvyZdgu/Nj0rfucyDvbHtlj4LEkK/yNhCDLmVK+lQqBsBBRhKBs69aBCoAIEwhOGPGkYG5+OY26jS164Mi95MSBpfV+lIp5HonaqJ1lgr9EThjNNHb1TlWBJGP5givftc6ZnBe0YKJGgZIKFRpN3mJc17Q+ssp8pwn8GwGSTYPAL/jemhOJbpjEh69ttGHY1L3d6cvCyp0uovbQBmGu6gtIOwpJoUMJBwsFLf2MAK82HaKNAmwnWo6rBUlf8DMAuACgxetzWwaOmy+ZRpl0EfzoVACUVVJfQiFMVhUDFCCjCUDGEqgGFQBkIlEYY6HL5KOpih4UiDfNbLoLUKbauUglBFqIhDPQMoEcDy6YA+EXOQpsCezjrwwDcbQZAojqBtgZWof0C9fq0Rfij6bnwJfPfNHp0ekr8ybxsSTQyplcG26edAOMoWF/wTi8JxoagkSb/zvoMymQVumjSloCXP40e+RsNWunxQZUIDS9JeuyFkgXaNpAcMcYEVRY0bnzKHIfdToK2CiRAlDJQQkJJwxnmWKj6sI+lSntCNbshIKAIw4awymqOIw+BUgkDZxCGNIwUshANYbCvWy+A5wG0m+J6GkBahZc0vRsoOXgSAI0X7YWui7yAdzL/yK96ely42QnQPZLGhbysSTJIEHhh062Sdgr2Pp2Bm5pNAkIywGBMdG20Cm0XaHhKCcQm5h85B0o9zjMJhH3MVKPQnoIXP59loeslvR/ybqvFhXOnW6UVRIqqDkaRpEuoKgqBSBBQhCESGFUjCoESESiHMLALP9IwP/ltSEmxdXWKEC9gTIJBmRhEKLiUr5LgucQL017sBMGrbz7H/xg7wVn4963Ndmlz4VbH/gw9GSaa6gC7C6e9DskFCYW9LY7bGoOXPQElJbTB4KXuFhTK3gfJEMdNshKUpIx9sy5tNezkJnitVA2FQAgEFGEIAZKqohCIHIFyCYMxEPEIxsYOL1JPjDSywGGWTxgih1s1qBBQCFSOgCIMlWOoWlAIlI5ARYTBJA2J2sNw/IIVmJe8EJDOZE2lj8nzu71EyYLVjiIM0a2BakkhMAIQUIRhBCyCGsIGiEDFhMEkDUI+CGmEC65WWQotNhUn3W4ZH4bvRxGG8FipmgqBUYCAIgyjYJHUENdDBKIgDAIPQojqGLVJuS2kOAaa9umyyAKXTBGG9XDjqiltyAgowrAhr76a+7pDIBLCIObi5AxjE0RfbmreEznRhYT4DI7vpHdC6UURhtIxU08oBEYwAoowjODFUUNbjxEYFYTBCB70GmLxqTjxNruLYLiFUYQhHE6qlkJglCCgCMMoWSg1zPUMgdFDGAh8eaRBEYb1bNOq6WzoCCjCsKHvADX/dYPA6CIM5ZGG8ggDoyFagY3CrA3jGDDCYpjCCIgMzVxKYawErxTUpbSj6ioERj0CijCM+iVUExiVCIw+wsCgUa9CJqbilFuXhsJ8fnI+4rVn4PgFTBYVttwLgJEZwxYGKSLBCApqxPaOA/DnsA2b9X4AYHaJz1SrOhNYMZeEW3nOzGdRrb7DtssIlzuHqMzQ1syNwqiY/I/BtBjNUxV3BBjoa3MPcIhj+DwzFSCsCEMF4KlHFQJlIxBFoCVRbaNHw4ahuIQlDTc2HwpdXI2t99oN02bbs0QGQVYqYWB7zLHAJEtB5TIA5wdVcvw+kggD80Qwo6ZbYXZLho1e14XjYPjrUgv3CPN1MKU5c18wDLY9X0ap7a1v9a1Mqm7zYjKy7w7HhBVhGA6UVR8KATcE5jf/GrKswzXf2rogDPl+/SUNFlmoTczAcbcyeVIppRzCcAmAMJk5eRkxGVUpRRGGUtDKp+UuhzA4e6HEgVk22R4lEBt6UYRhQ98Bav4bOAJSCtzY8mtI+dWykFhXhCHPVl5BAlNxfObForHPTx4CyGsxpuaoMsgCmyqHMCwCMDMAQyaS+tCWyCks5IowhEUqXy8qwmD1+i4AZhelxGFDLoowbMirr+auEDAQqIQ0rFPC4EIaKicL5RIGfoFSv+uV7IntUrJACUOpRRGG0hCLmjAYbwmAywFcCCBMErLSRjw6aivCMDrWSY1SIVBlBEga5rf8BpBfKamndU4YbKRBih2Q0+dAxGfgpNsq8SooR8LAgTQByPrgx1TPvyoJ33xlRRhKA60ahMEaAVUUTEu+IRZFGDbEVVdzVgi4IlAOaRgRhMGYzWsQWBkBWWBbQYSB1uBubpdU6/zWZ3fRO4JeEs6yzExj7fWoIgylvbLVJAwcSQpAR2lDWi9qK8KwXiyjmoRCIAoELMIg5EGQ+GSoJkcOYeBwX4YWn1qhdCEMYVjoYa/wOwB+Ehoa0W3tgusCAJ/3wVsRhlCbsVApiDD80PR+oE3JZgC2BXAggC1CdkPPCUqTygtXHrKTEVhNEYYRuChqSAqB4UegIF1ADonaWRjopffElwMHMrIIQ1SkIUjC8G0Abqm8ewA0emC2vU/wJWb6vCpiwsDLcDsAOwBg37SveNOMNUCvkXIvu2q6VU4BDKJaD4ABrijJofTlv+bYA7ejWSGIMIx1ibdAb70DAHwLwNEhOvoDgNND1HNW4dy4JlwbEpW1AJiF9TUADH2+oow2/R7ZEsCOtv5ipscH98AjphFu2C4VYQiLlKqnEFhvESgYPULHyZ0pCCEhZ2u48bHrIKX/oTjyCEOeNNTWHFymh0QYCQO/Rh9w2Q80jONX6nsuv50I4EaXv/Pi/g6AmyMiDLwcSEBI9hhox6s8A+AW5vMEwP/vV2gPMtGsEAegeVTWAdjjXTwM4DMBbW8DgATss+YF6lW92/R+oBRnZUCb5RAGe5PHA7guAD/Os8G85IOOho0AsE2+SyQlXoWSC0qvOMc7HFgG9WH/nWTrc2Z/xN8rdAH3KyOUcq7cB2sCOqHthhex9YvDwBgltwMgifUqtA35ZphJqjgMYVBSdRQC1UDAIguQEidlWg2yYJUwpGFkEgbGaXgJYxJTyyQNQRKGrQAsBsD/dZZm89B3/t3ry5xfqrwcKiUMvCTSAE4CwK/IsIUX3y8AUEzPr1238kaAjYVXX7yMvGJOkHQw0M8FAPjFH7bwa5xk6O8+D1RKGNj0dHNdSJC8CsfPi9KvnAZgTgD5cHuekUy5lpSulFKOMe1oNi3lIZP4MOvsXT7PlSNhYJh1BsEiafIqvzdVeX4eRoVnFWEocWVVdYVAZAgwcBOLkyxYHZA0zH/st4CkH/rQMlIJA0daPmkIQxh4CfArzll+akoMnH+n+JdhlZ2FNg8MW10JYSBxYYwAt/bDbpWnALR4qE2iJgy8hEmUTgk7OEc9ujXyi/1Wj+ejIAxsmiTKL3rhPwEc6jEGEjjukS+WOUc+RonDxaZnTdBlyq93RhH1isIZZhjs4yKTQLrVL5UwUNpFN2KqYbwK9/3JACidClUUYQgFk6qkEIgYgfktFwFyJ5zUeUaRZMHZjR9pGMmEgfMgaZi41yciDg3NC5oqBjfxLMnGNAeEdaau2O1rlXkZ+BVWLmHgYfwfUy9e6Qb5nykyX+1oKGrCQA+DMyocLKUhtHl41qWdqAgDPWGo6/f6OmbSMdZxivJ5p2VCBPIKC8H3APwooDK9c4JtjsL1SBURpU7OUgph+JiptvuET5fEiF5DJYXfVoQh3CKqWgqBaBFg8qmJW5yAaX/gwedf8uqJ30HK4i+mkU4YOKstNh2PI/4UJjGUhUEYCQN174+7gMbLdmOH/pl6ZIplneUtU63Br+VyCYOXq2bQinr9TjsLfvHZS5SEgSoK2n/4nfv82iSO4wMmwbm7eZdERRjYPdeF6+NV9jTzT9h/54X7s3IXwOU54nE4gH94tHkqgD9F3B/tDpx7Nixh4Loxr4qfxItzYWTUILuJIdNShCHClVZNKQRCI0DCsMmOx2PGNeFeWjfSsOESBoYLZnRHN8NCHpT2pFleFwhF6vzCKpcw0FDwrz7rza9jfp0+auqoSXL4Vc68F36H+ZEOXTYlKVbciX1NYz+3bvm1b0/zTYNO55fx/aYLo9vzNGakl8L1phcDRdq0/aBdiFuh/QW/ZJ1ZEqMkDLNM1YIXzLzI/2b7kQSCdgdBdiQki9wjtN/gM34Gqmye9elB4vSi4JrSaJUqEK/CLKIkghwXJTN7mMGn+KxXIRnmHrGrQsIQhoSpHiMuXoWE8YiQ2V0VYQh9oKuKCoFqIlAqYeBYDNLw6O8h8QVjaBsuYeABfqd58DlXidbktPq2Ci3EaR/gLIz8eEUFhIEXhVe8DIp7aTTnJlnhZUaRs1fWzL942Gdw/JW4VdKDhLh5fSQSI47bXngR8sKzvDScGFLC4EwXHiVhmOFhxGqNg9IYu/cLPRz8PIveNm037CSDBqAkJgw9zQvXq7BOu+NHkj8/dQUNaqk+Yw4Te6FajRf3x33646V+t+33IMJAckpJh59tCokIpRdlu48qCUM1LwXVtkLAC4FyCAPbspOGDZsw0B3SzUr+JvOytpDnJckvYWfh1zqNIcuRMNDugamY3QpJAv38/TIs8pJ60pQ4ONugTpkxAjhuZ6mEMJwAgNi4FRpd7urx21wAbR6/zTZDZ9t/jpIwfMohNXEO4yybBIJSAsaN8Praf8f8umfMBbfCr3I/LwWuN6URVuHdSTLldem/AmBnHxsBGu0yaJhX+Y3D1iSIMNBWxy91+xIABwOgdK7soghD2dCpBxUCFSBQLmFgl3nScD0gVuDkDN2xoi83Ne+JXJFov7w+qmPDwMuUhx/tHZyFBzWDJbHwwOah7iy81Cnmp1i9HMLAVNq0oHcrlDzYJRxeuPGL3kt03GrGPXA+Wwlh4IVK+w63QjycBIe68MkAuL+op3crbtE1oyQMjJvgFnPDGguJDN1ZWWjfQ+8Pr8L4GMTPr9wWEDiKKqWnzQb2Mw1evdpzk0jY65I0ukUetepQfWEnjX5xGJgxliokr0L1FG15SKgqKoowVASfelghUCYCFREGMy02ZBOE8NOjlzk4I4vmtpBGEKLKSvUIA7+oqD93C0jDL3SGgqbq5o8uE6DRF339WcohDPSM4IVRrUKjPTdCUglh8BsrLy5ezruZUg9ejLyAgu4HN/VJlISBhnl+aa25dtZXOjGjvYpbIRmiR4tXrAvrmSCCYlfBeO0tqy0SNLrsRlX8JAx+fZBAHwSA/1txCdoQFXegGlAIKARcECiXMDDY003JOdA9xcQRwC0egZAPjnDCwHny69Mtep91kVDnzGRFzmLPD1EOYWAAI5KSahXqovN2KsUlSsLwaVPfT0mNny7db47U0dPOwF6iJAxBRo+Mw8B4DCw3+Ojv/YJY2cdOF04//b5l98JnvFRi/I3qDzc1WCX7xU/C4NduMoB0lTQmRRhKgktVVghEhEA5hGG4yEKi9jAcv2AF5iUvBKRb3obwIFRPwsAx0HiQ0Qqd5UoA5wFgbAM33fxhtmiFpRIGipLp2eIXhTA8Pu41vYISRUEYeMnS9iMKCQmNB51qlSgJA0MmO91M7YhRZULdPMu/zS9pN0RJJhj1MUyhYaRXIixrX7EdqkKoOnIr9IzZJ0xnJdQpV8JAfGiv44zvUULXg1UVYSgLNvWQQqBCBMohDPOTcyAlv7qqVMQjsMiC1cP85LchZfl+7dUlDHT5c1r2c+R0YaPKgSoLZ+4F2i0wdK8lLi6VMFDU7LR6j3o9eMjzMnSWSgkD9w7bCHI7DDsfN2ITFWGgyyPF6Ezc5VYoCeBvjDzJ4kcYvCQ2bu16GcmyLl1czzUf8iMMNKblJR1l8ZMwcC/7xc0oZf6+Y1aEIcolVW0pBMIiUCphGA6yMDZ2OI65zelXD1RCGqpLGHjx0+rbeY7R04AxFjpdlsP59VcqYWCTjFngdUDTKI6ZMysptL+wLiZ7O5UQBhq9MaCPV/Iqr8uThnK0bXArbI9uevYSFWGg/Qy/6L0KiaLdXXa+wzvG/hxVV1TBBBV6WPjZHTBB06/MRvxcKq2gYEH9lfK7n4SBY6Kkh7YnXuVrZqKrUvocUlcRhorgUw8rBMpEoBTCMK/lWkCvjjcEhy/Eo6iLHeZKFqzpMZS11JmrobRSXcLAsdAl0O1rnAmSLMNG+5jtYmX+vRzCwOyNXqm03aI1loaZd+1KCINXPg2rN4qs6XVC6Qz99fkfiYsfPtUiDLz4aFjqFxCJKic7ofBST3F+TC3OWBJBOSEYVMktgqiFEWMqWFFBmd+FiZu8Co1yg6O4ht8ZQW6V3HdcY69kYhwL1VBU05VdFGEoGzr1oEKgAgTCEoYbm6+BDvqbV6eEIQuVkIbqEwa/OAFumFHyYE+cVA5hWATgKI8FYXrt/wsRSY9GcV6Bgihudwv6VC5h8HIvtaZATwO6KLr56DP646Uec60GYaARJi8/r2BRHArJzQ4AaG9gFdoTWC6WbsNl3AN6dfiVoDwbVuwOtuHl1mu1z8BdXnEvrDp+bpVUndndKoMIAxN1MZka02V7FbpX7lWJSk0Rhuocw6pVhYA/AmEIQ7XJAsPjjo1P95UsOGcxL3kxIBmHIFypPmHgwUxxdNhC9zp+cVqlHMLA5E28XLwK8aHI2qvQK4F2CmM8KvBLl4GdnKVcwkBLeTf1DNvnpUuPDy+XQ3pCMFy1W4mKMFBNwsuYlyIDTAXZWFAET/WAvWwJgEGZvEgYpUIMuOWVbGknU5Xk9fxLAFjHklLQ6JXeMl7ZIPklz/68CoNA2UOYO+vdYmJh/T0MYWBdkhRi6FW8coD4PDL4kyIMoWBSlRQCESMQRBjmJ6+GlJWkyw0a8GPARofhlPl+EQnd2yiFNFSfMDCqYlgfcwZxcoZzLocw0P2Oun0v8S9xo4Ecv86dFxS/jHkJN5RwCVtV/QgD80TQ396tMFwygyy5lSyAJo/f+BVNw0Yvu4dyCAPTTvPrmfEzGDyLFy6/er2yUjqHRvsRZmG0kz6rDiVHx/hs/PvMhFnOZ5m3gUGb/PI7uEW1pOSFa+xVqMIjcXSqQnjvMmQ5iZxXYbAseolYJSxhII6MSkly41XCBLFyfVYRBh9U1U8Kgaoh4EcYRjJZsACZn/wOpHQLzVwMWfUJA/vj158V3dFvydwiE5ZDGNhHUN4C1qEImLp4Sgt4aVBywP68JAt8xi2ngzUnP8LA9pl7wNJRs2+GF2bhJWpXw9gxYjZGiuvtAcCof6d4mxeeX2KmcghDJa8Ux3q0T1wBqomoLvIrlKgwcBeNX2kjQfdH2rrU+jxEgkOSwn1mL7RjoZGrnyEpv+ipNqN9Ad1xSc6Y9+FYn/6YoZRSKLsNRFjCwGYprSGB9JKWkMSSXD5c6mIowlAqYqq+QiAKBLwIw7zkVYCkC1WVingcmDC9LMmCc0Q3Nl8C3Tf5TrXSWzvzLNBtzCt8sX3UX3YxVCuXMNBXn0TA76u01DXkpcL8CV7Geb90EcV79WGPZrlLCM8NzoUkg66KvESD0luz3+EmDBf62FNYODDbZtiYC2HXx6/fHwKg/UBQofsn79swXipuocFLIQwcC1U23C9ehVI5Elja3IQuijCEhkpVVAhEiIAbYag+WViNRO3HcfyC5ZHNJIg0DI+EIcimwJou1RHO3BLlEga2SVc9ehYE6dzDwM18APt7iNqt5/1UC84+7ISBv9HVk8QhyjJchIH2FRT9B+WC4NwoNaD0wEvlU+r8mRWV0Sy9SBzXnmobuq1GUay06862SiUMvNspbfGyP2H7C021SJD3SGEsijBEscSqDYVAqQg4CcP85isjCcXsNQ4hngDknYDYFfHaY3H8gqC4+uFnNK/lu4DOL62hZXgIA8W8VsQ/r3FTb+1moFYJYWBflGzQANLPniEIS3onMMT1swEVSXg4zzBRJp2Egd4hzlTUQePi736JjYaDMCw1U0RT+hK2kBjRJqFS0sBgUMSNoZ79Cj06aJNQaXRHRs6kqsItFkSphIHjpSEoVVRehpmscxGA0NFcFWEIuwVVPYVAlAjYCcNwkIV47XQcv+A9GJe73BeJ2uOGhTQMD2HgOUbdtFdUQK6cW6Ik/r1SwsA2JplJkLxiM/jtHEo86N/v5/9vf54HfJh4GE7CwDb8smy6jZExLiji9xJtV5Mw8KK73HSx9PJs8MOVkga6WYZRVTnb4Rc3o5vS1sCKJBn09tOI8zLT0yOorvN39sEMpwxz7jXXcggD+2EocNq2eKlC2Dfr/CvMoBVhCIOSqqMQiBoBEoaJW5yAZe/+DFK6RfWLpkdKFiyyYLU4P/k9SOwTOWkw2pVM7DRYhocwsL+g1MTOQD/WGKMgDGyLEgYG8/mqqRsOWj96WfBC42XcG1TZ9jvPbGZNpMEpDfG8ihthYF1GZqRbop/LH438KBpnKGm6rXql646SMNBbhwaiNNbj5fVgCZj4VaUhJKMcMoy4lxGg9TxjXzAmBdelZINAsxF6ljCmxWcDjFtZnTgzYiXXMogwlksY2E8QUeRepFSGHii+RRGGIITU7wqBaiBAwiDwenWzTuJJJOoONSQLzlIt0nBj8/ehgy5o+VI6YSB58rsIaYDmJrJlKmRn5kT7rBkV0Gm/wN/pD0+PAK9CPW+Q5b3zWRqTTQNAl0/+R5Ewgw1xHahS4GVIcXc5X872vihRofvcZi6Dp5qDuny3wq9N4sWQz1Rz0NWTFzYjO1IFwcBJjGnAwiBUXpITzsepKqC0JUwmT86dYcjZBvtmfo7QuvQyXkmK5+mBQrw4Pq4L1XKcJ/97xoxVEVVKaq4JSQP7s/YB7R0415cBMIMmbR/c3EPdpkcvDq/Il9xbfqST97zbHrH3Q/wD96MiDGXsPPWIQqBiBEgYZFEs/IqbdDTgTRasirzcpdgL8drPRaqesJOG0glD1Dio9hQCCoGIEFCEISIgVTMKgZIQqC5heBJ1iek49q9uoX6LhzmvZTaE3goZTfrbwcbFDoDUypAwlASjqqwQUAgMHwKKMAwf1qonhYBCQCGgEFAIjFoEFGEYtUunBq4QUAgoBBQCCoHhQ0ARhuHDWvWkEFAIKAQUAgqBUYuAIgyjdunUwBUCCgGFgEJAITB8CCjCMHxYq54UAgoBhYBCQCEwahFQhGHULp0auEJAIaAQUAgoBIYPAUUYhg9r1ZNCQCGgEFAIKASmhcBrAAAgAElEQVRGLQKKMIzapVMDVwgoBBQCCgGFwPAhoAjD8GGtelIIKAQUAgoBhcCoRUARhlG7dGrgCgGFgEJAIaAQGD4EFGEYPqxVTwoBhYBCQCGgEBi1CCjCMGqXTg1cIaAQUAgoBBQCw4eAIgzDh7XqSSGgEFAIKAQUAqMWAUUYRu3SqYErBBQCCgGFgEJg+BBQhGH4sFY9KQQUAgoBhYBCYNQioAjDqF06NXCFgEJAIaAQUAgMHwKKMAwf1qonhYBCQCGgEFAIjFoEFGEYtUunBq4QUAgoBBQCCoHhQ0ARhuHDWvWkEFAIKAQUAgqBUYuAIgyjdunUwBUCCgGFgEJAITB8CCjCMHxYq54UAgoBhYBCQCEwahFQhGHULp0auEJAIaAQUAgoBIYPAUUYhg9r1ZNCQCGgEFAIKARGLQIFwtCUaTtdSr2OMxFCrOhOpueVOysppWjKpNoKzwuxLJtM/9WrvVLrlzuukf5cU1fb56Wuf4zj1OKiZ8mM9D/Djtnr2cau1GTo8jODa4G/ZZMdz4Vt11lv6Fppb2ST7beV2966ei7K/b6u5qD6Hd0I7H5Haoc1/XKGNYvNNtv4Tw98+tKVo3tWg6MfTed6Y2fqNEBO4Oilpn3U09z+x9GyDlGf8X7zLhCGhkzr25DYwiAMEM9nW9KfKBewz8tbYk9l/jFgPS8E7s8mOw7yaq/U+uWOayQ/t8fdZ23dt2bgZSllPE/aYidmk3NvDjNmv2cbM21nSqlfa7WjCXFqJWRw6j2z48tXLusfXFtxXzaZHiQkYQY8AupEud9HwHTUEEYhAo1dqTlSl7Py77vIZpPpplE4Dc8hj6ZzvTGTeklKuX1+LbAsm+zYerSsRdRnvCIMo2DlGztT35GQPzaGKsTb2k7123ZPmr02zND9no16MynCEGZFVB2FgD8Ce2Vmj/0Iy96AxMbGK69p52Wb269cn3BThGF4VjPqM14RhuFZt7J7mS1nazdllr8AyB1MhvvLbLLjgjANBj0b9WZShCHMqqg6CgF/BKgS06X+u/wHAvpiibHbLDnyivfWJ9wUYRie1Yz6jFeEYXjWrexeJi2cdWQul7vDPDykAHYJa2cQ9GzUm0kRhrKXWT2oECgg0NjZ+pAEPmVKFOf1JNOnrm/wKMIwPCsa9RmvCMPwrFvZvTRmUrdKKY8xCcM9PcmOQ8I2FvRs1JtJEYawK6PqKQTcEZh8R9uuA/36/6xfRSx+cHbmnH+vb3gpwjA8Kxr1GR8JYZiUOef/cnUDH/VMn/NuEAylbpRS6/v1v9ejHYk1bz/ZKHJYtfm4rV65d9rsgvFl0Ljtv39q0dkbrdT07ZCT73bPnLu8lGdLqdt457kT0d/3SsHYURMnZZvTN4VpI8yzQZvJUGksenvnuoRY9fhh1ywTQki/vislDAfef8GEDz5csV0sluhNbD7ltcf2bi0YUIaZs1udvf524ca9uVXbjtHE+2HmwDaqafQY9d7h/FavWbFdLKGt2KJmy2Xl7mkLO67h26ve3xqxvvG1uYkvPZacvbpc7IOei7qvauwfzoHn2/iY/sHDM6750G9OTQtn1ddoeu0TR7a/HPSueLXTmGm9VkqcaX4g9PQkOxqDcLT/PvWe2bXv9L67zVNHXb3UbwzE/t1V7+ycG6+/1j1t7qpS+rDXLXf/RXGus42ehfcYxogNM6e9vEAcnyt7HpnZY9eIt7aPj6tZ9uS0Kz+wt1Ou0WPU+7Gc9yXojC8XL7fnfL0kpmTOahjAwA+lxIGANKxG6UEhBR6OQUsvSc69395oQ2fq9xByuvE3iW2t3wSwVgq8Vfi3FBdnW9J/KrW+sWm62r4IqeeNA43xaGd3N8+9fVJX29kS8kQJ7AGJWuM3IQYkcLsGXNqdTP83CDjDPUWKbwEyKaXctNCHwEcAFgPapeyr3IPCrf+mrraLdV3/SX4ypRk7hnnWbTMtaW6f37SwLQWJEyCxl4Qcb6LZKyD/oglctiTZUfgCchxWJXtJEFepyzMgxImQ0nAbNfvTBWQWEL/Vaur+WIoOt6GrbS8hZQrAcfa1AkSvEPIZCTF33MQ9/uBFSMIShoZM6jJAnlAYshQDEFprT3Lu3UUHTsR7h1+huQH5DUh5tAQ2KcJMyAeFFDfEx4y/YfERl3FvBpame2aNx0r9FF3ga5BydwAx8wWiCmw5JP4RF4mfPJW8tiewsYAKUfcVxf5p6Ez9D0Julj8zxIv07JnS1bbTgK7/ABAHS8jtAPAyegKadi9qtZ9bH0fca9DlWQL4tITcOf+q4iNIPKYJfN3rXXGDaYixI8Q3si3pK+x1vc44w1Vd4CQJsQ+kHMPzAsC/BDDfcls3PgC6ll0IKaYLIfeTEmMhwDV+VUD8fsvx9T8OQzgr2X/lnOvOM+atVW+epkOeI6RslECNeT6uERIvSCFvqB8/8Yp7p83uC9qrxHs13jwd0L8uJT45uOfF8wAehBb7fnbmnJdLIQxR7Ef7uCt9X8IShsldsxpzuv5nKeRGtvPk4frx9aeGwTL/7pjFeYBqmnaGLnNdxoZzKXxhNMSOtJOGxs5URkI2By2i0MSsbHO6vdT6bNcJjhD4IiA+WxDpuw6WL4x2YTbZ/kuvsTVkUt+GlD8LGjuEeKSmBs2Lj0gXCJD1TFNX26m6Lk8H8NA4Me6Kx5K/esevvbzB4jJu3B2Nepp2WU9z+7cCxwAg7LNueEmIFkh5nHc/Qtc0cW53c/s1zjqlSBj4dbCk658/1iEvhBzca+5LJN4VEKd1t7TnbTk8CiVIH73x+K8AnB2EkxB4RQjt1O7m9vucdYMIg+FDvrDtWsvtzXhZBPo1KU5a0pL+i729KPaO1R4xe7rrH1cVvkB9JikEXoiJ2Beebp77oB8Wkzpn7aOL3J+lxP/5YyZ0XipbTdgqFeZScWsryr6i3D9DzjehnZ6TuUUADN97ZxECz24Uq9lnVW7tjrrEvcWkbbA2P4aEpn2lu7n9hqD9yN+bFqa+pOfk7426QqxBXWwbp9TW451NQsrPefXBM7V7Znu6qavtOinll33G8mjNmAlTvYhmFPuvnHPdGm/DwjM/KXK5hRYx85yvEC9DiK9mm9v/7lVn10Vnb9uf679DSjnZEw8hPhQxcQRy8qYgt8oo96M1nijelzCEYcrCs6b05wb+Dsgtrb6FEP/abNONkqXE/nAnDEK8Dykpm85/2QjkxdTOQ1+ID+NxcdDTR7Uv5s+lbpRS6xt9OOIKQIilkHKnMC8rhLioJ5n+ubNuY2bWCVLmhqgBhBDLZf6LOP81Noj0I+NQP9Uuym3qajtI1/WCHlIIcV02mf6a37gaMrMOh8zdVagTi+/SM3POs2HmEvbZyvDSzu9Jtl9uH09YwkBCc3PX8i4p5VFh5mPtM02Ktu6WdIfbM/m+l98FyCE2HoY0yYxh4Xh2pSbEdKeEyY8wGGShq61DSjm4fgJ9Ajgum+zgJVMoUewdqzHjsM788zZX0i2wQkCMc5ljTmjakV4Hp2EUq+u3GV+kjuKFmYC48YRk/amzxWw99NpRrB9hX1Hvn6L15vnG46wgRRQ6w/UMnav4A4AZ9kPWOAsd56CAeHds3cYff+ywX6wIwqsx0/qglNg/v9/F/J5k+pSh51Fx7JSiM86lf6Mp4AMJ3ALgDNtB5TovIbTvZpPtBSlt1PuvnHOdY2A8md6+gQcsb7HCcQuxSgrZZ8UJsv9d1MT26z5yzhInhntlzt/iI6x6wi7p9lobrp8UMl5wcXWJwxD1fuRYonpfgghD08JZu8uc/ncJubkNgzs33WLssf854IreoD1r/92VMBQWROBxIbRzMU48UbdqS321tuxA6GiXEh8frCPas8m0EXwkL6oRm8c0oeX03GCUQoGnILXCF2Fdbey5Jw6/9o1S6xt9OAnD4EAe0aS8JZ7QMv0Dui6E9ikp9dlFYwXWxkViN6fYtTGTuldKeXD+HRYDAjhfYMxtS5JXvbL7Pedu0r+y79AccB4gDxzcrLgy29JxnvXvpkzrr3SJb9he1rd6WtJb+S1GY2frXyRwrHl43NuTTE8Lu3hhn/XEC2KxEGKBBj2jaQl9IJf7FIS8xGLZ+TEZl+Sudo+NsIShsSv1XanLHxZtNiHIcLviSNzVL3NbCSFnSOBzdsJnqK807YCe5vbHhh6krT+SEpfY/p7ThGgXmrbwY2O3vPfNVcu2ExBHSSAlpSzohXkgiAnaDnY9rhdhMA+G30kpv2g/mDRNa1nSPPeeoWOqfO9YbTZm2r4lpX5poQ9+gUJcLIS8u3tm+5Ld7v7W2P7+j/aXVMXYJESc35gE9n7yqPRL9vFR367r+uIiNZAQ/9OE+K2mxRdN2CT+xop3+qZKobdICap3bNsXF/ckO4IlbuYTUfcV9f6xr7ftHb4VAt+e3Hzo0uzCez+Zk7krpcThQ95BgXeEEGePHbPxHb3xlTl9dS7Jc9C6YPKvirgk25LOqxY9Sv4rr9/4uMoXbWpPS/u/hu4pB2HIn0vvQ2DWZptstLCvV2i9fR8eK6FfIyXGOZ/ney212CVTZhz8Qvdd9+6or9Uvk5BH2/bVh5tuXlfvvCyi2n/lnOscW2OmlRLtmYX1EeI+QFy+1fit7qTIfNKds3bW+3NpKXGobS5/6Ummh0heGjNtf5RS/0LRlhZIa0LcBjkmq6N/fwk9CcjjLBX2YL9DAzdFvR+jfF/8CMPkhWftndMH7i5WsYu/ip3qTwwb56f4WDD/NeSFEuL1+vH1Ozt1G5O6Zk2zkwEB8Wq2JV0k6izV2KWU+u4XoHhA+3j9IU4AJt153ma5tb2d9oseQvy5J5n+vAWCKYJbUXjxhOjsSaYHXy6zYt7AsPdpKWHoQQHx1pTkIVtbRjiTMrM+nZO5guhbCKSzyY7B8NiOt5obRur6q4UvxhhO7pnZcaPfgWP9VsqzbngJIf671fj6g51ru8eisz/Wl+unVGBf28tzczbZcaL17zCEYde7ztpx7Zp+hp8uSGY0Ia7tTqaHqBG4Rnr/6v8U9Iv5w/eJbEt6TzsWPCxya/Vnir4EhTi7J5kuRLG06hv9rx14EnJQV2epwaw6boTB2Idd/7weUp5cmD/wAeLaUdkZ7Q851yaqvcN2J981a7uBNcb8jPDshi1GTB6dndnxN2e/pp76OkhQ/WWVX/e0dLTa6zoPTSHEc1qibj83W5GGztari9U84o36CfXbh1VNRNlXNfaP83xjZMUTmusn26UoNCZ8c9WypVJiYtEh6WKI3JBJ0Rbk10EXl72dpkzqGl3Ks8z1faanJd3g9r67vrMuY2jMtJ4jJYqCPbnNi2q81cueeM7+MSA0MSXbnH7a6r8a+6+Uc73h72duLnpzlOgakW4hxIeapu3iNDjf9a5vjlu7dmWPJTngB8YO8ZqN7phxzRprLkOJGVVt+BLt5px4u0kInZEeq7Efo3xfvAhD46K2/WROv7OY2OKGrSZMPD3se+3Ey1PC4Bd5zG4gwgbHbb1njd24rJSNwudLqe+i33slUSP2cbMpMA7irlmNA7r+tHXRCIHViZoJW1o6vKYls2v0F5bRSty43Kj33mr8xI+7AdqYafssIAsiv5jQzn+6eW7WAtXcfF+CEA/FEnXX+BnxNWRaL4LET/MvB97ZMVazrX3Tux0ktssu9LNDDx/xhqip3Tt75JXLXA8rSomkXGyJXWmrssnmYz9mfY2EIQxNXW0/0HX9e4OHKTJTmg89xsvCefKisz8+kFv7UJHIUdP2tksZGjMO6YImOnqa08VfxbYJTepMHZcTMm+Jzm85iCV2wuIkDFtNqG98c9Xy+VLKApk0jFA17fDumXOfdMMqyr3jtIPQhDinO5nmJe5azDj9T0lgUn4LiVWbbbbR1pY+kp4aH+bWLivYIAnxIbTYPl4qr6MWnT3mpVz/nySkER6eJa4lLnh65rWP+u1F/hZ1X9XYP0M+iDwIemNn6xUSOHdwzuKZE5P1TU71zP4Pnlf3/rurafhonKFuJNeOG+t/8M7qNyw1r6aJb3Y3p2mLM6QMPeOGkhs+RO+Fj3o/KLL29wr93pRJ/UyX8ttWZzFNO3pJc3vn4JlSbMNV6f5ju6Wc602ZMw/VMfCdwvsqxA3dzel8YCtHcUpzY6J2e0qDrWpDzgoP1U+hflfqx1KXhb6dhCHq/Rj1++JGGAS0l11sdH59YnJiW6mqRjv8noRBi8UmerkTNmZa75MSny5svpqxm9svx1I2Sqkby4V9f7+npaNI9O3cYI2dqZsl5PGFv8dEsmdmuqvwsnSmegC5i/VvAfxbithP6sdv+e+w1qNBh6r9dx72jZnUCwVjRyF+1ZNMfzNMG6U+67KZftCdTM/266shk/pzkchb05qzze0L+UwYwtCYaX3GLjHQYvH9umfOeTigz8sg5fmFOg5MGjOpZ6WUhfwmMYHdS7FOd/bt0Gm/DODxYsNZ8UZc06bbCaHb+Bsi2juNmdbHpIQpVRF6DNp+miZ9XZhzUp43+MUKxESsZUlybobjnJRpOzkn9UICOSFwWzbZkY/1EXGJuq9q7J8hEoaauq3dSLPzq10I8ZtsMm2zCxgEr7GzdbkEDLUj7Z2yyXSRZMIOs+H5oOu0iTCMHcdh3LZeRtEuZ9wQ6VHhsutsfd9ukFlXm9iG6l7nEjdl2lK61Nutv2sQKbutUNT7r9RzPcyWpMdDr/b2FKnnzpRSnla4fxDbd0nL3EcK53kmRenibta/axJaw+Kj2p/x6sMgf++sZtIv66OxKJdE1Psx+velWIXFPQvIk+3qKk3g8u5kx+D5GgZwlzpehGFlT0uHzfWi+MmGTGqB3WK3Jl6z3eIZ17xm1RpOwiAEZjoN0YZeDm3fgNQH2bxDlJ33btCHiKso7qKbldS0+yDkv2rH1t7v9N8tB/fGha2HyRwKbnlBG9reR6nPDvlasV3+XmNv6kqdr+vyMut3IbSzssn2Ofx3EGHI2wAs65MSCeNsdBEZuvXLbJu6rtNoK3+mQtyebUl/lv/ftCtYMyiuRF/9+IkTyhWrsU03nfbgfPFKXGjTnmpuXxq0vlHsHVNa0FdwHwvq1ON3AZyZbemYy5+dOtcwOvYyu420r2rsn6HrLfQpyUNq3CRejZ1tX5XQf2PbCz/OJju+64ZNA0l/weBa+NosNWRSD0DKA8y9fWO2JV1QeznbLoXkN2RSr0HKbcyXRo6buOcYN1diZmOUkNcX5mV6qvHf1dh/bLfUe8COg6FGeXPx/lLPHSCA3STk7pDgB0OxAXo+D0fhg8Zc6w8GDRjF+9lk2lQje+/wBhvJsEsYqrEfo343ve3UzLNUwHMPl/rOuxMGIV7vSaYLcRSGbujUjVLKgl7bKRIqdaOUUt8JTl28ZssnZlxDf2TP0rSw9Wg9h0IKZqGJn2Sb03bjOTR0zTpWSH2OlLLeuyWhkzgkkJhVib+6/Queri3ZZHpq2IUr9VknXvGxtfVPT7/qTb/+qHqRUi+kI7fjFUQY8pbO/a8PHrjiv9lkOh8C16fkdai5gljRLuId0ibEQ9mWdN7SvMziSxhoNR2LHRDaY6XCvbPrXakt166RvmsSZpqaED/vTqYvYt3GTOrXdi+PmCaOXNKcHvTICdNgyDpR9lWN/WNeIoPZeH2kAU7CoGna193ci/NthiMMpt/+UxaccSGmPZ1M3+sF7xDC4JAG2J+zEwYh8F422WG3hC9U9SMM1dh/7LiUc90aaD4WDo2v6Z3i7vLqxE3TtNMst1ZTWmAPRPZoT0vHPkFbubGz7ToJ/SusZycM1diPUb4v+Xd9qJGsfb5e9mNBmLj9XlZ668bMyCEMCU3b7KnmdsNNyqs0LEw1IycNUS2LJrSfdSfbL3bWn9LVtmkOaJNSp9ve/l4xKChS1KS8pLulo/AVHhb8yX8/Z6tcb9+r1hd4TGinLEm2zw/zfDnPOjdT7YS6TYOkJI1dbTOlrhdUNvaLKIgw0DhUru21i0TDvbALz9xe5gYKVv5C4PFssmMv44VwtEmjzTAkxHdP2NK5021NQC6WEoZEwyhCLK2pwf5etjFR7h36i68dWPvqYNf4SAKFf4fZG8aQpbjBstRv6Gyla2pBlK5BmxEU4yJsP856UfZVjf3D8QbF3bDmNJQwiK946dLDEoZig1LhaexYGEMJKemLCIOLAfrgvLwlDNXYf+y3VMLQkKEkWP7Sw8WVH2vPAuJxIWVtwbssL438gmXQyCBI+soc1Qvma4z/ZJMdhmTHr9ijb9oJQzX2Y5Tvi3E+OvaL0MRcIxaHGcCQdTTgW+XcV07MRj1hEDEc7mZJbp+oUy8ZZNDDZ2nQJpa+ta8udbpbHgwhp1qXvNV2LC4OXTIjPeg+GrQr818lhQBRdIfbIZ7YJryxY+nPuqgkDvMLdmLMPZP6ui7lVbaX7txsssP4dxBhcKoPGOxoh1jNhKA5Tsq0fi4nsaAAoc1bpdoqCUYvHSvqd/tILqOL296D8xb/HYv6aaWGTi5175gHK6288zpUn4M/xBYzqkQt9vQ9bB0utJWoP6qxf9YlYRhi7Bji4A7yq7evRRSEoRr7r1TCYBopLyiKcSHEg0KITk2T98di45+0DNWH2JnYCEP+Am1dNai/91cVFQhVJvWw5R02VCWxvKAOjeI8i/rddNsvEtqARO7GAp4CUtPEid0z0wW1b9izxF5v1BMGTdO+093cnvc28CiNmdT1diMZIbRjssn2gooiDHCmJf9vIGGLlSD+0NOStru2+TZlGCx2tT1v6T1LMUQp91mXwE2uwauKDiGG+Ib8UuFvWuy4nua5t4YhDMYL25l6zh6pTcS1/d3cEu19NmZaL5UShSiXTmwaM63P22NqJGKJXZ+aeW1BzBtmDYsP2tZBETXE89mW9Cfy7qq5h4siIgrROaX5kGMriWEfZu80dKZeLApY4/ASKXV+TtsKAdyabenwie5Zag+D9aPuqxr7Z11JGBozrV+QEn/ME0GsHSvGbxMUAXa4CYNBqCLef6UShoZM6lFIaUgUWby8PfhbsXtqsYTBmEumNQuJgsuqlyGo1ZcRPXbZEyut4GZOL4mo92Pk74uHRKoodYCxAcWaGLTpzpQOpbz5w0IYAPFAT0u64FXhHKBTdOVX38Wt8tmxtZvs6xVljT60/Wv7abVvGOERtI1jiS2tJDONmdRvJGRBFC2EmGb3T7aPddKi1qbcAApRxehNkW3pMAI+hSmNXW3Tpa4X/OoTItEY1hai3GfdXLTEeG1fr2Q0TMKjy77nLAM8Muox4+u2tNQYQRKG/Avd9lNd6oYuPX9Qilu6k+0neuXg2C2T2maNxH+tfCXGMw6S0djZ+nMJXFhoUxNXZJvTtkBZxStgGFFK3TAANNqTBiko2D14XSCGvlmCBmoFo18hMCeb7DD95wf7iXLvGDkrir1EHtkxljjISzJD9dRAbx/14IYbpJCiN66J3Sz1HAOO9a3qWz54CIr3ocX2YNx8t73KdX1z1bJ/SxiGZSZosVaLKPrt76j7qsb+WVeEoaEzdb8VB0YIcVM2mT4p6KxYJ4Qh4v3HOYY91w0pzLu9HxYS8EF0Z1vShruws+Tb/OfzdnJtV0mw/lDXWFzT09LxdS/cnR4kQ9wqIz7Pon5f/PZLQ6b1d/Z4LbRzScS1A/y8Rvz2Z1UIg5nnoJBVTABvZls6PI0JS6nvEYjojhOa65ud/qX5RC/Lb4WUR9gur65sSzpp/XuodT5uPSE58fNuvqpGIKj+1e8MxijQrs8m2wsRAdkmE9Vo48Qzbhey3bukVLJR7rOueEHc3p1sP8Z5gTNwzfJVy26BRAEfIcQd2WSaBkhGGaKXdFnbXe9o22XtgE6WX9hfgPhpT0u64OtstcdALP1rVt0nIfcorJEQ2Wwy3WTfuE6yxt/sxk72urRFGdD1rOXyZtYtkkT5XSCTulJH6BIMYJUPImPwTO0CZy6SKPdO051nTtLXDhQC6RidesSaMC73lcv+IYHPFManibnZ5nQh7kT+4HS4Ewvxv5qa8Qe65REY+jWCFZtuPnaiPRqgEfV0Ve/2bu6sUfZVjf2zLgiDc01jWuwQt2ihzgN6XRCGauy/sOc6A8b1DqwdTE4I0d2dbJ/s9oExJMaCw4aBWE5alDowNyAHEyPS5kyIw9xyyjCkv5T6P+zq5iGBm6pwnkX5vvjtl3zunSfudITTf7FmjNgvrH2WfX9WhTCYh9U79tjVAviFhthfZI1YXTMm8fqQ9KKdqVD1vSxChcDdUmjz67T4ogF9YECH3FeX8udSgpn5rJITiO+bbZnzuPUHk1Qsc3xR3pyoSVy0+IhrX2Q9qgMm35Fq1HP4id0wzm5Bnb+k5P0SsolRyiC00+1fZ06DRT+Rm/MAqeRZTwtagYxAbN7Y2gl39uu5gbVrPtpbCHmpPcojIHRNYH9nHobGTOu7gxEv6dYkfhIT8du0+MAr1iZs7EpdLnVZCJ1tXLrADULTOuvGbHT3mv7VW+Rya5slxGl2UST7BMQh7iFzbWmB87c4D4IfxkQsY6knSCz0HK4uCh8L0VtXG9/Z7p8edIE0daZadch0YS1cdIBR7R2rj6HRFg2icn1ci122+dgtsmvGrEiseK9vbynl96Q0s8KaQZsSY+K7Wvt1kIwZETeZdXQwwZIQ98Ykrh0fT/yNUjbaW2Dpm1/WoV9RFCJXiKt7kulzCmPLpM6CxKWMREmyOzl56CF2NY0ZDS+SvozzI+L9E7Te1jyjNHpsyKSugpTGly2TWXU3pxvCZLpdF4SBY4x6/5VyD9hjWpgE/+sbb1Z7HQkrz98pC89syOm5iyVwqvN8dEoYjLlkUncWfygyY7J2UULgtsUz577YlDlrDylyDA3NfV0IVmauVVEchmrsxyjfl6D9QqK/ZlXfg/Zw+Uyi6MyH5MTV7d9VIwx2v2Nnx5rQvtydbM9nbDNL2PouOvm3nSmTKd5fyRgAAAaPSURBVJ91y45I0pJt6ShEO7P6nrQodUguJxc6YornmAYXAssAOcl+QRrPCbE0IcTelgh4aOwCPJlNdhS+mhu72i6Uum4kvirV2LGiZ4cm6yrCy0xAxH3g4t/sLvYvSqBjW0Nh8/c1oiAuXX4/pHRxafJK9mPgOrsnmf6B22bNS0CWP2QPymLV41eBBBJDX36moxaftQJPDe63oTYMzj4butp+CV0fDKjl8qUSxd6x+jVDEz8wGMBpcET5VO0yNiTxkUC/RKzZmW7berIpkzpFh/yT+3PiVQG5ndOYFwL37BirOcpShzAK5Iu5/lft75mbHVAUfRXGHfH+GW7CYIrZX7di+LtJqLwO6KALwHFuFuIw+BnL+rlVVnP/hT3XnZ4D+TMWfUKCJHQXe3Aqhji3B3FzIwyuF/LgYbGmOBmb6BVC6pahpFPCwMeqcZ5F9b6E2S9muPyHi/PK+EfgHVbC0JhpnSEljOiAYQhD2PpDdPLQvgahf9EeedJ1ogK/7G5OX+jF8CdlZiVzMsfIeK7pbu1tMjNcPJb4jN3orrEzdZ6ELGR2tLsF5rMfpp6zjPZEgP7d3lclz7IdN7ykYdA4mEjL4+C65sTkxHPdVDNOt0vbpV0UIMRUN9BGJFBva6T6BZgbohA0x21cRljVgf7ri5LpeEyA4ZJlTJ7hlqMjzAViWOxnli0ocuESeC+OxIF225NK9459+CZmvyuKTOo5P3wgNO2M7ub2Qe8Sl7rG+JAjadjY65Iq/F2IezffdKMWe8rbfAjs5a/aszY6Qwtbz1falwsWkeyfMOttvC+OwE2aVp5bpf2CprFjbbxm26B4Mdbcw1wAVt0ovCSquf/Cnut0h5SrdEZbHbShcb88OoQuF0vACCTH4kYY8mt55p4QuYV+sXVIxDVox+pGIi+5vdGeS7ZK/r0a51kU70vY/WLmlrjH/mFMF0ynKtPvjKiahCF/WbXOAMQFUqLRfti4SRjC1ncDBzvVL9BfWP59CJzoTHXNwEhCil+E8UE3YrP3fTBLAGc7E9Dkd6b4UEBeHRfa5c7YD4ZKQsoHKPYxLipN+6KlkjDipEvmIs+XuBZrCgo5bNWt5Nk8psVBPagK2T6W+PNLubU/ksBJzvSvAngYQvwim0wXAje5bSC3tbVLGOzPMA6G0BnfAkcO8bFmkhng+hjic8IagBoqoq7UcTkp2txSXRvrJGX7WDH+Mi+L9LAXSD5nQO+/HJKSF+Nja/e3B8CqZO+44Tupq61Fl/qZEjjMRVq2ksnNtMTYn/vlK7G3axizYs2ZEoZ/dpEIlimbhRQPazHtB0tmzr3TY73PkRC/4JeZEPjP5OZDD/LyHKm0L2f/UeyfsOsdGWGwhc8XAkUJ3PwOZK93tjuZLoT5Lnq3bJEeK5UwFO2XCPdf2Hsgn4iu93uAnOWUenFuUmDuic31l968cHmr1OWgQbPDrdI+DwZe6lszcAEgv1qU2TOfifdRAXE+Va72/EhehMFqN4r9GO27OfSM99ovpjH4zfYzRQhxYTaZHsyS67NBbUZpQdt4ZPwexKaY9Uzrpd1CbmUdxi0NcmHymhXzqffJ3h11oW+rQXs7Dv3FY5rrlwUl7pjcNeuAMWMmLLF7bdgNXIQQ92WT6YKxWhCqlTwb1LZxODEL58CaPSG0lQmhLbWH+A7zfCl1qEtb29u3o9DFdrrQexOa9so2Mv5SUIwGvz643ujTdxAS20HT3qtNiOcfP+yaZWF0xaWMvZS65e4dtz7ytjHajiI2sJ2e0z5gavhK5kcjqL53/re97BfbC6GP0yGXbrJZ3QvOVMduY+G8evHRTk6bFs93qIK+3Nqsxv4pZV3D1nUa6JYTryVsX9WuF/X+CzNe2gatib+5c24AOwloK2MQrzc0f+a5SlybrTZlDjvkgNfH1e++2C2EdpjxWXWi3o+VvJuljLuSuusdYagEjGo8y7Cr/WvlaxZj9rLsd+u7kmerMRfVpkJAIRCMQGMmdaWU0jAYpb69u7l9l3VJYINHrGooBMIhMKiS6GyV4R5RtRQCCgGFgEJAIaAQWF8Q6GnpCCU8UIRhfVlxNQ+FgEJAIaAQUAiUgUDJhKGMPtbJI0E2DOtkUKpThYBCQCGgEFAIrOcIhBJDjCQMFGEYSauhxqIQUAgoBBQCGwoCo48wLGrbT+Tk0YUF0rSbu2fOfXJDWTA1T4WAQkAhoBBQCKwLBEYdYVgXIKk+FQIKAYWAQkAhsKEj8P/vyKq8haQ9BwAAAABJRU5ErkJggg==" width="${watermarkWidth}" height="${watermarkHeight}"/>
        </a>`
      )
    }
    if (type === 'svg') saveAsSvg(svg, mainAddress)
    if (type === 'png') saveSvgAsPng(svg, mainAddress)
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

export const getFundFlowImages = (fundFlow?: FundFlowResponse) => {
  return [
    ...Array.from(new Set(fundFlow?.nodes?.map(v => v.logo))),
    ...EXT_SUPPORT_WEB_LIST.map(v => v.logo),
    DEFAULT_CHAIN_ICON
  ].filter(item => !!item)
}
