import DOMPurify from 'dompurify'

export const sanitizeText = (dirty: unknown): string => {
  if (!dirty || typeof dirty !== 'string') {
    return ''
  }

  return DOMPurify.sanitize(dirty)
}
