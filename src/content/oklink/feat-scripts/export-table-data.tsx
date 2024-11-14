import { createRoot } from 'react-dom/client'

import { ExportTableDataBtn } from '../components'
import CHAIN from '../constant/chain'
import { getTableDomArr } from '../utils/dom'
import { createTimerFn } from '../utils'

const setBtn = async (
  chain: string,
  containerEl: HTMLElement,
  tableEl: HTMLElement
) => {
  createRoot(containerEl).render(
    <ExportTableDataBtn chain={chain} table={tableEl} />
  )
}
/** Show export data for a part of transactions */
const genExportTableDataBtn = () => {
  createTimerFn(() => {
    const list = getTableDomArr()
    if (!list) return

    list.forEach(({ downloadParentDom, getTableDom }) => {
      const table = getTableDom()
      if (table) {
        setBtn(CHAIN.chain, downloadParentDom, table)
      }
    })
  })()
}

export default genExportTableDataBtn
