export const getSubStr = (str: string | undefined, lenArr = [8, 4]): string => {
  if (!str) return ''
  if (lenArr.length < 1) return str
  if (lenArr.length === 1) lenArr.push(lenArr[0])
  if (str.length <= lenArr[0] + lenArr[1]) return str
  const subStr1 = str.substr(0, lenArr[0])
  const subStr2 = str.substr(str.length - lenArr[1], lenArr[1])
  return subStr1 + '...' + subStr2
}

export const insertStr = (source: string, start: number, newStr: string) => {
  return source.slice(0, start) + newStr + source.slice(start)
}

export const decodeUnicode = (text: string) => {
  const parser = new DOMParser()
  return (
    parser.parseFromString('<!doctype html><body>' + text, 'text/html').body
      .textContent ?? ''
  )
}
