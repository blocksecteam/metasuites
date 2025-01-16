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

export const getTxHashParentDomArr = (): HTMLElement[] => {
  const parents = document.querySelectorAll(META_SUITES_CLASS.txHashParentOnce)
  const result: HTMLElement[] = []
  parents.forEach(item => {
    const element = item as HTMLElement
    item.classList.add(META_SUITES_DONE)
    result.push(element)
  })
  return result
}

export const getTxTabsDom = () => {
  const el = document.querySelector<HTMLElement>(META_SUITES_CLASS.txTabs)
  el?.classList.add(META_SUITES_DONE)
  return el
}

export const getTxOverviewDom = () => {
  const el = document.querySelector<HTMLElement>(META_SUITES_CLASS.txOverview)
  el?.classList.add(META_SUITES_DONE)
  return el
}

export const getTxTipDom = () => {
  const el = document.querySelector<HTMLElement>(META_SUITES_CLASS.txTip)
  el?.classList.add(META_SUITES_DONE)
  return el
}

export const getContractTabsDom = () => {
  const el = document.querySelector<HTMLElement>(META_SUITES_CLASS.contractTabs)
  setTimeout(() => {
    el?.classList.add(META_SUITES_DONE)
  }, 100)
  return el
}

export const getReadContractBoxDom = () => {
  const el = document.querySelector<HTMLElement>(
    META_SUITES_CLASS.readContractBox
  )
  setTimeout(() => {
    el?.classList.add(META_SUITES_DONE)
  }, 100)
  return el
}

export const getContractVerifiedHeaderDom = () => {
  const el = document.querySelector<HTMLElement>(
    META_SUITES_CLASS.contractVerifiedHeader
  )
  el?.classList.add(META_SUITES_DONE)
  return el
}

export const getContractCodeHeaderDom = () => {
  const el = document.querySelector<HTMLElement>(
    META_SUITES_CLASS.contractCodeHeader
  )
  setTimeout(() => {
    el?.classList.add(META_SUITES_DONE)
  }, 100)

  return el
}

export const getMethodsDom = () => {
  const els = document.querySelectorAll<HTMLElement>(META_SUITES_CLASS.method)
  els?.forEach(item => {
    item.classList.add(META_SUITES_DONE)
  })
  return els
}
