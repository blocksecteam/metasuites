import { createRoot } from 'react-dom/client'
import browser from 'webextension-polyfill'
import $ from 'jquery'

import {
  TRONSCAN_TABS_CHANGED,
  TRONSCAN_PAGES,
  TRONSCAN_MULTI_SEARCH
} from '@common/constants'
import { lazyLoad } from '@src/content/tronscan/helper'

import { ExportTableDataBtn } from '../components'

const genExportTableDataBtn = (page?: string) => {
  switch (page) {
    case TRONSCAN_PAGES.ADVANCED_FILTER.name:
      browser.runtime.onMessage.addListener(
        (message, _sender, sendResponse) => {
          if (message === TRONSCAN_MULTI_SEARCH) {
            lazyLoad(main, '#popupContainer #loadingVideo')
            sendResponse()
          }
        }
      )
      break
    default:
      browser.runtime.onMessage.addListener(
        (message, _sender, sendResponse) => {
          if (message === TRONSCAN_TABS_CHANGED) {
            lazyLoad(main, '#mainContent #tab_data_list #loadingVideo')
            sendResponse()
          }
        }
      )
      break
  }
  const main = async () => {
    if ($('#export-table-data-btn').length) return

    const btnRootEl = $(
      '<div id="export-table-data-btn" class="tron-mr-12px"></div>'
    )

    const tokenHoldersContainer = $('#mainContent .token-holders .search-token')
    if (tokenHoldersContainer.length) {
      const wrap = $('<div></div>')
      const sibling = tokenHoldersContainer.prev()
      tokenHoldersContainer.css({ position: 'relative', bottom: 0 })
      wrap.append(tokenHoldersContainer.clone())
      wrap.prepend(btnRootEl)
      wrap.addClass('d-flex align-items-center')
      sibling.parent().addClass('justify-content-between')
      tokenHoldersContainer.remove()
      sibling.after(wrap)
    } else {
      const container = $(
        '#popupContainer .top-wrapper > div:last-child, #popupContainer .transfers-header-container > div:last-child, #popupContainer .internal-total-info > div:last-child,#mainContent .token-balance-header > div:last-child, #mainContent .token-transfer-desc > div, #popupContainer .advanced-filter-table-header > div:last-child'
      )
      container.addClass('d-flex align-items-center justify-content-end')
      container.prepend(btnRootEl)
    }

    const tableEl = $('.ant-table')
    createRoot(btnRootEl[0]).render(
      <ExportTableDataBtn chain="tron" table={tableEl} />
    )
  }
}

export default genExportTableDataBtn
