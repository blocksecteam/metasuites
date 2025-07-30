// Default allowed tags and attributes for basic HTML sanitization
const DEFAULT_ALLOWED_TAGS = ['span', 'b', 'i', 'strong', 'em']
const DEFAULT_ALLOWED_ATTRIBUTES = ['class', 'style']

// Dangerous attributes that should never be allowed
const DANGEROUS_ATTRIBUTES = [
  'onclick',
  'onload',
  'onerror',
  'onmouseover',
  'onmouseout',
  'onkeyup',
  'onkeydown',
  'onfocus',
  'onblur',
  'onchange',
  'onsubmit',
  'onreset',
  'onselect',
  'onresize',
  'onscroll',
  'ondblclick',
  'oncontextmenu',
  'onwheel',
  'ondrag',
  'ondrop',
  'onanimationend',
  'onanimationiteration',
  'onanimationstart',
  'ontransitionend'
]

// Dangerous protocols for href and src attributes
const DANGEROUS_PROTOCOLS = [
  'javascript:',
  'data:',
  'vbscript:',
  'file:',
  'about:'
]

/**
 * Escape HTML entities to prevent XSS
 */
const escapeHTML = (text: string): string => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * Check if an attribute value is safe
 */
const isSafeAttributeValue = (value: string): boolean => {
  const lowerValue = value.toLowerCase().trim()

  // Check for dangerous protocols
  for (const protocol of DANGEROUS_PROTOCOLS) {
    if (lowerValue.startsWith(protocol)) {
      return false
    }
  }

  // Check for dangerous patterns
  if (
    lowerValue.includes('expression(') ||
    lowerValue.includes('javascript:')
  ) {
    return false
  }

  return true
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param dirty - The potentially unsafe HTML content
 * @param allowedTags - Optional array of allowed HTML tags
 * @param allowedAttributes - Optional array of allowed attributes
 * @returns Sanitized HTML content
 */
export const sanitizeHTML = (
  dirty: string,
  allowedTags?: string[],
  allowedAttributes?: string[]
): string => {
  if (!dirty || typeof dirty !== 'string') {
    return ''
  }

  const tags = allowedTags || []
  const attributes = allowedAttributes || []

  // Create a temporary container
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = dirty

  // Recursively clean the DOM tree
  const cleanNode = (node: Node): Node | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      const tagName = element.tagName.toLowerCase()

      // Check if tag is allowed
      if (!tags.includes(tagName)) {
        // If tag is not allowed, return its text content
        const textNode = document.createTextNode(element.textContent || '')
        return textNode
      }

      // Create new clean element
      const cleanElement = document.createElement(tagName)

      // Clean attributes
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i]
        const attrName = attr.name.toLowerCase()
        const attrValue = attr.value

        // Check if attribute is allowed and safe
        if (
          attributes.includes(attrName) &&
          !DANGEROUS_ATTRIBUTES.includes(attrName) &&
          isSafeAttributeValue(attrValue)
        ) {
          cleanElement.setAttribute(attrName, attrValue)
        }
      }

      // Recursively clean child nodes
      for (let i = 0; i < element.childNodes.length; i++) {
        const cleanedChild = cleanNode(element.childNodes[i])
        if (cleanedChild) {
          cleanElement.appendChild(cleanedChild)
        }
      }

      return cleanElement
    }

    return null
  }

  // Clean all child nodes
  const cleanedDiv = document.createElement('div')
  for (let i = 0; i < tempDiv.childNodes.length; i++) {
    const cleanedNode = cleanNode(tempDiv.childNodes[i])
    if (cleanedNode) {
      cleanedDiv.appendChild(cleanedNode)
    }
  }

  return cleanedDiv.innerHTML
}

/**
 * Sanitize plain text content, removing all HTML tags
 * @param dirty - The potentially unsafe text content
 * @returns Clean text without any HTML tags
 */
export const sanitizeText = (dirty: string): string => {
  if (!dirty || typeof dirty !== 'string') {
    return ''
  }

  // Method 1: Using DOM textContent (more reliable)
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = dirty
  return tempDiv.textContent || tempDiv.innerText || ''

  // Alternative method using regex (less reliable):
  // return dirty.replace(/<[^>]*>/g, '')
}

/**
 * Sanitize content allowing only basic formatting tags
 * @param dirty - The potentially unsafe content
 * @returns Sanitized content with basic formatting allowed
 */
export const sanitizeBasicHTML = (dirty: string): string => {
  return sanitizeHTML(dirty, DEFAULT_ALLOWED_TAGS, DEFAULT_ALLOWED_ATTRIBUTES)
}
