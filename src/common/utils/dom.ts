export const getNodeValue = (content: HTMLElement | null): string | null => {
  if (!content) return null
  const arr = []
  for (let i = 0, len = content.childNodes.length; i < len; i++) {
    if (content.childNodes[i].nodeType === 3) {
      arr.push(content.childNodes[i].nodeValue)
    }
  }
  return arr.join('').trim()
}

export const setDeepestChildText = (
  element: ChildNode | null,
  text: string
) => {
  if (!element) return
  if (element.firstChild === null) {
    element.textContent = text
  } else {
    setDeepestChildText(element.lastChild, text)
  }
}
