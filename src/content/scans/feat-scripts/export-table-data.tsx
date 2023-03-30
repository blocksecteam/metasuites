import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { validOrigin } from '@common/utils'
import { type SCAN_PAGE_NAMES, SCAN_PAGES } from '@common/constants'

import { ExportTableDataBtn } from '../components'

const setBtn = async (
  chain: string,
  containerEl: HTMLElement,
  tableEl: HTMLElement,
  position: 'head' | 'tail' = 'head'
) => {
  const btnRootEl = document.createElement('div')
  btnRootEl.style.display = 'inline-block'
  btnRootEl.style.verticalAlign = 'middle'
  if (position === 'head') {
    btnRootEl.classList.add('mr-2')
    containerEl?.prepend(btnRootEl)
  } else {
    btnRootEl.classList.add('ml-2')
    containerEl?.append(btnRootEl)
  }
  createRoot(btnRootEl).render(
    <ExportTableDataBtn chain={chain} table={tableEl} />
  )
}

/** Show export data for a part of transactions */
const genExportTableDataBtn = async (
  chain: string,
  pageName: (typeof SCAN_PAGE_NAMES)[number]
) => {
  switch (pageName) {
    case SCAN_PAGES.ADDRESS.name:
      {
        const txContainerEl =
          document.querySelector<HTMLElement>('#ddlTxFilter')?.parentElement
        const internalTxContainerEl = document.querySelector<HTMLElement>(
          '#internaltx > div > nav'
        )
        const txTable = document.querySelector<HTMLElement>(
          '#transactions table'
        )
        if (txContainerEl && txTable) setBtn(chain, txContainerEl, txTable)
        const interTxTable = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_divinternaltxtable table'
        )
        if (internalTxContainerEl && interTxTable)
          setBtn(chain, internalTxContainerEl, interTxTable)
        const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe')
        for (let i = 0; i < iframes.length; ++i) {
          const iframe = iframes[i]
          if (validOrigin(iframe.src)) {
            iframe.addEventListener(
              'load',
              function () {
                const _document = iframe?.contentWindow?.document
                if (_document) {
                  const tableEl = _document.querySelector<HTMLElement>('table')

                  const containerEl = _document.querySelector<HTMLElement>(
                    '#linkShowAllTokenTxns'
                  )?.parentElement

                  const divTokenStatusContainerEl =
                    _document.querySelector<HTMLElement>('#divTokenStatus')

                  if (!tableEl) return

                  if (containerEl) {
                    setBtn(chain, containerEl, tableEl)
                    return
                  }

                  if (divTokenStatusContainerEl) {
                    setBtn(chain, divTokenStatusContainerEl, tableEl, 'tail')
                    return
                  }
                }
              },
              true
            )
          }
        }
      }
      break
    case SCAN_PAGES.TOKEN.name:
      {
        const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe')
        for (let i = 0; i < iframes.length; ++i) {
          const iframe = iframes[i]
          if (validOrigin(iframe.src)) {
            iframe.addEventListener(
              'load',
              function () {
                const _document = iframe?.contentWindow?.document
                if (_document) {
                  const containerEl = _document.querySelector<HTMLElement>(
                    '#maindiv div nav, #maintable div nav, #dataStatus nav'
                  )
                  const tableEl =
                    _document.querySelector<HTMLElement>('#mytable') ||
                    _document.querySelector<HTMLElement>('table')
                  if (containerEl && tableEl) {
                    containerEl.style.display = 'flex'
                    setBtn(chain, containerEl, tableEl)
                  }
                }
              },
              true
            )
          }
        }
      }
      break
    case SCAN_PAGES.TXS.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_topPageDiv > nav'
        )
        const tableEl = document.querySelector<HTMLElement>(
          '#paywall_mask > table'
        )
        if (containerEl && tableEl) {
          containerEl.style.display = 'flex'
          setBtn(chain, containerEl, tableEl)
        }
      }
      break
    case SCAN_PAGES.BLOCKS.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_topPageDiv > nav'
        )
        const tableEl = document.querySelector<HTMLElement>('table')
        if (containerEl && tableEl) {
          containerEl.style.display = 'flex'
          setBtn(chain, containerEl, tableEl)
        }
      }
      break
    case SCAN_PAGES.TOKENTXNS.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_divTopPagination > nav'
        )
        const tableEl = document
          .querySelector<HTMLElement>('#tblResult')
          ?.cloneNode(true) as HTMLElement | null
        const theadEl = document
          .querySelector<HTMLElement>('#divSTContainer table')
          ?.cloneNode(true)
        if (tableEl && theadEl && containerEl) {
          tableEl.querySelector('thead')?.remove()
          tableEl.appendChild(theadEl)
          containerEl.style.display = 'flex'
          setBtn(chain, containerEl, tableEl)
        }
      }
      break
    case SCAN_PAGES.ACCOUNTS.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_topPageDiv > nav'
        )
        const tableEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_divTable > table'
        )
        if (containerEl && tableEl) {
          containerEl.style.display = 'flex'
          setBtn(chain, containerEl, tableEl)
        }
      }
      break
    case SCAN_PAGES.TXS_INTERNAL.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          "#ContentPlaceHolder1_divTopPagination > nav[aria-label='page navigation']"
        )
        const tableEl = document.querySelector<HTMLElement>(
          '.table-responsive > table'
        )
        if (tableEl && containerEl) {
          containerEl.setAttribute('style', 'display:flex;margin-left:0.5rem')
          setBtn(chain, containerEl, tableEl)
        }
      }
      break
  }
}

export default genExportTableDataBtn
