import { saveSvgAsPng as savePng } from 'save-svg-as-png'

export const saveSvgAsPng = (el: Node, filename = Date.now().toString()) => {
  savePng(el, filename)
}

export const saveAsSvg = (svg: Node, filename = Date.now().toString()) => {
  const data = new XMLSerializer().serializeToString(svg)
  const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)
  const a = document.createElement('a')
  a.setAttribute('download', `${filename}.svg`)
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.click()
}
