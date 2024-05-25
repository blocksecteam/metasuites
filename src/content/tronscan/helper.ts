import $ from 'jquery'

export const lazyLoad = (
  callback: () => void,
  inspector = '#mainContent #loadingVideo'
) => {
  const loadingDocument = !$('#mainContent').length
  if (loadingDocument) {
    setTimeout(() => {
      lazyLoad(callback)
    }, 500)
  } else {
    const loadingContent = !!$(inspector).length

    if (loadingContent) {
      setTimeout(() => {
        lazyLoad(callback)
      }, 500)
    } else {
      callback()
    }
  }
}

export const getTextWithoutRemarkLabel = (element: JQuery<any>) => {
  let text = ''
  element.contents().each(function () {
    if (this.nodeType === Node.TEXT_NODE) {
      text += $(this).text().trim()
    } else if (!$(this).hasClass('remark-label')) {
      text += getTextWithoutRemarkLabel($(this))
    }
  })
  return text
}
