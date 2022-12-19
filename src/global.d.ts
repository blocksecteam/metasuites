declare module '*.less' {
  const classes: { [className: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module 'save-svg-as-png' {
  function saveSvgAsPng(dom: any, name: string, option?: any) {}
  function saveSvg(dom: any, name: string, option?: any) {}
}
