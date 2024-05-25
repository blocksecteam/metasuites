import Color from 'colorjs.io'

export const hexToRgba = (hex: string, opacity = 1) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export function getContrastColor(bgColor: string) {
  const bgHSL = new Color(bgColor).hsl
  const isDark = bgHSL[2] / 100 <= 0.5
  return isDark ? '#ffffff' : '#000000'
}
