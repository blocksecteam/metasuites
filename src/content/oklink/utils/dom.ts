import { ADDRESS_ATTR } from '../constant/enum'
import META_SUITES_CLASS, { META_SUITES_DONE } from '../constant/metaSuites'

const getTableParentDomArr = () => {
  const domList = document.querySelectorAll(META_SUITES_CLASS.tableParent)
  return domList
}

export const getTableDomArr = () => {
  const parent = getTableParentDomArr()
  const list: {
    downloadParentDom: HTMLElement
    getTableDom: () => HTMLElement | null
  }[] = []
  parent.forEach(item => {
    const downloadParentDom = item.querySelector<HTMLElement>(
      META_SUITES_CLASS.download
    )
    if (downloadParentDom) {
      downloadParentDom.classList.add(META_SUITES_DONE)
      list.push({
        downloadParentDom,
        getTableDom: () => {
          return item.querySelector<HTMLElement>('table')
        }
      })
    }
  })
  return list
}

export const getAddressParentDomArr = (): HTMLElement[] => {
  const parents = document.querySelectorAll(META_SUITES_CLASS.addressParentOnce)
  const result: HTMLElement[] = []
  parents.forEach(item => {
    const element = item as HTMLElement
    const text = element.innerText
    if (text) {
      if (text.length < 4) {
        return
      }
      const prefixStr = text.slice(0, 4)
      if (element.getAttribute(ADDRESS_ATTR)?.indexOf(prefixStr) === 0) {
        item.classList.add(META_SUITES_DONE)
        result.push(element)
      }
    }
  })
  return result
}

export const getAddressToolsDom = () => {
  const addressTools = document.querySelector<HTMLElement>(
    META_SUITES_CLASS.addressTools
  )
  setTimeout(() => {
    addressTools?.classList.add(META_SUITES_DONE)
  }, 100)
  return addressTools
}
