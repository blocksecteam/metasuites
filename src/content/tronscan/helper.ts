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

export const isHashItemsSimilar = (
  hash1: string,
  hash2: string,
  numItems: number
) => {
  const arr1 = hash1.split('/')
  const arr2 = hash2.split('/')
  const slicedArr1 = arr1.slice(0, numItems)
  const slicedArr2 = arr2.slice(0, numItems)

  for (let i = 0; i < numItems; i++) {
    if (slicedArr1[i] !== slicedArr2[i]) {
      return false
    }
  }
  return true
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
