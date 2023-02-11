/** *scan Tooltips with custom title */
const widthScanV2Tooltip = (referenceEl: HTMLElement) => {
  referenceEl.addEventListener('mouseover', () => {
    requestIdleCallback(() => {
      const id = referenceEl.getAttribute('aria-describedby')
      if (id) {
        const tooltipInnerEl = document.querySelector<HTMLElement>(
          `#${id} .tooltip-inner`
        )
        const title = referenceEl.getAttribute('data-bs-title')
        if (tooltipInnerEl && title) tooltipInnerEl.innerText = title
      }
    })
  })
  return referenceEl
}
export default widthScanV2Tooltip
