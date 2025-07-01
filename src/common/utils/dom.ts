import $ from 'jquery'

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

export const hasSiblingWithClass = (el: HTMLElement, className: string) => {
  if (!el) return false
  return $(el).siblings(`.${className}`).length > 0
}

/**
 * Wait for an element to appear in the DOM
 * @param selector - CSS selector to wait for
 * @param timeout - Maximum wait time in milliseconds (default: 10000ms)
 * @param container - Container element to search within (default: document.body)
 * @returns Promise that resolves with the found element or rejects on timeout
 */
export const waitForElement = (
  selector: string,
  timeout = 10000,
  container: Element = document.body
): Promise<Element> => {
  return new Promise((resolve, reject) => {
    // Check if element already exists
    const existingElement = container.querySelector(selector)
    if (existingElement) {
      resolve(existingElement)
      return
    }

    let observer: MutationObserver | null = null
    let timeoutId: NodeJS.Timeout | null = null

    // Cleanup function to prevent memory leaks
    const cleanup = () => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }

    // Setup timeout
    timeoutId = setTimeout(() => {
      cleanup()
      reject(
        new Error(
          `Element with selector "${selector}" not found within ${timeout}ms`
        )
      )
    }, timeout)

    // Setup MutationObserver
    observer = new MutationObserver(mutations => {
      // Check if target element was added
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              // Check if the added node matches the selector
              if (element.matches && element.matches(selector)) {
                cleanup()
                resolve(element)
                return
              }
              // Check if the selector exists within the added node
              const found =
                element.querySelector && element.querySelector(selector)
              if (found) {
                cleanup()
                resolve(found)
                return
              }
            }
          }
        }
      }
    })

    // Start observing
    observer.observe(container, {
      childList: true,
      subtree: true
    })
  })
}

/**
 * Wait for element using jQuery selector
 * @param selector - jQuery selector to wait for
 * @param timeout - Maximum wait time in milliseconds (default: 10000ms)
 * @param container - Container element to search within (default: document.body)
 * @returns Promise that resolves with jQuery object or rejects on timeout
 */
export const waitForJQueryElement = (
  selector: string,
  timeout = 10000,
  container: Element = document.body
): Promise<JQuery<HTMLElement>> => {
  return waitForElement(selector, timeout, container).then(element =>
    $(element as HTMLElement)
  )
}
