/** *scan Tooltips with custom title */
const widthScanV2Tooltip = (referenceEl: HTMLElement) => {
  // Find the element that has tooltip trigger (either itself or parent)
  const tooltipTriggerEl = referenceEl.hasAttribute('data-bs-toggle')
    ? referenceEl
    : referenceEl.closest<HTMLElement>('[data-bs-toggle="tooltip"]')

  if (!tooltipTriggerEl) {
    return referenceEl
  }

  // Use a flag to ensure we only add one listener per tooltip trigger
  const enhancedKey = 'data-metasuites-tooltip-listener'
  if (!tooltipTriggerEl.hasAttribute(enhancedKey)) {
    tooltipTriggerEl.setAttribute(enhancedKey, 'true')

    // Get the document where the element is located (could be in an iframe)
    const ownerDocument = tooltipTriggerEl.ownerDocument || document

    // Monitor the tooltip trigger element for aria-describedby changes
    tooltipTriggerEl.addEventListener('mouseover', () => {
      requestIdleCallback(() => {
        const id = tooltipTriggerEl.getAttribute('aria-describedby')
        if (id) {
          const tooltipInnerEl = ownerDocument.querySelector<HTMLElement>(
            `#${id} .tooltip-inner`
          )

          // Find child element with custom data-bs-title
          const childWithTitle =
            tooltipTriggerEl.querySelector<HTMLElement>('[data-bs-title]')
          // Use child's title if exists, otherwise use trigger's title
          const title =
            childWithTitle?.getAttribute('data-bs-title') ||
            tooltipTriggerEl.getAttribute('data-bs-title')

          if (tooltipInnerEl && title) {
            tooltipInnerEl.innerText = title
          }
        }
      })
    })
  }

  return referenceEl
}
export default widthScanV2Tooltip
