import { createRoot } from 'react-dom/client'

import { validOrigin } from '@common/utils'
import { ETHERSCAN_PAGES } from '@common/constants'

import { ExportTableDataBtn } from '../components'

const setBtn = async (
  chain: string,
  containerEl: HTMLElement,
  tableEl: HTMLElement,
  position: 'head' | 'tail' = 'head'
) => {
  const btnRootEl = document.createElement('div')
  btnRootEl.style.display = 'inline-block'
  if (position === 'head') {
    btnRootEl.classList.add('me-2')
    containerEl?.prepend(btnRootEl)
  } else {
    btnRootEl.classList.add('ms-2')
    containerEl?.append(btnRootEl)
  }
  createRoot(btnRootEl).render(
    <ExportTableDataBtn chain={chain} table={tableEl} />
  )
}

/** Show export data for a part of transactions */
const genExportTableDataBtn = async (chain: string, pageName: string) => {
  switch (pageName) {
    case ETHERSCAN_PAGES.ADDRESS.name:
      {
        // Transactions
        const txContainerEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_divTxDataInfo > div > div'
        )
        const txTable = document.querySelector<HTMLElement>(
          '#transactions table'
        )
        if (txContainerEl && txTable) setBtn(chain, txContainerEl, txTable)

        // Internal Transactions
        const internalTxContainerEl = document.querySelector<HTMLElement>(
          '#internaltx .card-body > div > div > div'
        )
        const interTxTable = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_divinternaltxtable table'
        )
        if (internalTxContainerEl && interTxTable)
          setBtn(chain, internalTxContainerEl, interTxTable)

        // Produced Blocks
        const mineContainerEl = document.querySelector<HTMLElement>(
          '#mine .card > .card-body > div'
        )
        const mineTable = document.querySelector<HTMLElement>('#mine table')
        if (mineContainerEl && mineTable)
          setBtn(chain, mineContainerEl, mineTable, 'tail')

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
                    '#divTokenStatus, #datatable_wrapper .datainfo'
                  )
                  containerEl?.setAttribute('class', 'justify-between w100')
                  const tableEl = _document.querySelector<HTMLElement>('table')
                  if (containerEl && tableEl)
                    setBtn(chain, containerEl, tableEl, 'tail')
                }
              },
              true
            )
          }
        }
      }
      break
    case ETHERSCAN_PAGES.TOKEN.name:
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
    case ETHERSCAN_PAGES.TXS.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_divDataInfo nav'
        )?.parentElement
        const tableEl = document.querySelector<HTMLElement>('.table-responsive')
        if (containerEl && tableEl) {
          containerEl.style.display = 'flex'
          setBtn(chain, containerEl, tableEl)
        }
      }
      break
    case ETHERSCAN_PAGES.BLOCKS_FORKED.name:
    case ETHERSCAN_PAGES.BLOCKS.name:
      {
        const containerEl = document.querySelector<HTMLElement>('ul.pagination')
        const tableEl = document.querySelector<HTMLElement>('table')
        if (containerEl && tableEl) {
          containerEl.style.display = 'flex'
          setBtn(chain, containerEl, tableEl)
        }
      }
      break
    case ETHERSCAN_PAGES.TOKENTXNS.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          "nav[aria-label='table navigation']"
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
    case ETHERSCAN_PAGES.ACCOUNTS.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_topPageDiv'
        )
        const tableEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_divTable > table'
        )
        if (containerEl && tableEl) {
          containerEl.style.display = 'flex'
          setBtn(chain, containerEl, tableEl, 'tail')
        }
      }
      break
    case ETHERSCAN_PAGES.TXS_INTERNAL.name:
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
    case ETHERSCAN_PAGES.NFT_TRANSFERS.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          '#datatable_wrapper > .topdivdt > div:last-child'
        )
        const tableEl = document.querySelector<HTMLElement>(
          '.table-responsive > table'
        )
        if (tableEl && containerEl) {
          containerEl.setAttribute('class', 'd-flex align-items-center')
          setBtn(chain, containerEl, tableEl)
        }
      }
      break
  }
}

export default genExportTableDataBtn
