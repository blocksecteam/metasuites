import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import browser from 'webextension-polyfill'
import { Tooltip, ConfigProvider } from 'antd'

import { isTrxAddress, getSubStr } from '@common/utils'
import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import {
  GET_ADDRESS_LABELS,
  TRONSCAN_TABS_CHANGED,
  TRONSCAN_PAGES,
  TRONSCAN_MULTI_SEARCH
} from '@common/constants'
import { TokenSymbol } from '@common/components'

import { lazyLoad } from '../helper'

/**
 * Generates enhanced labels for the given addresses.
 *
 * @return {Promise<void>}
 */
const genEnhancedLabels = (page?: string) => {
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
    const addressTags = $(
      '#mainContent .ant-table-content .ant-table-cell .address-link-wrap .address-link'
    )

    const filteredElements = addressTags.filter(function () {
      return isTrxAddress($(this).text().trim())
    })

    const addresses = filteredElements
      .map(function () {
        return $(this).text().trim()
      })
      .get()

    const res = await chromeEvent.emit<
      typeof GET_ADDRESS_LABELS,
      AddressLabel[]
    >(GET_ADDRESS_LABELS, {
      chain: 'tron',
      addresses: Array.from(new Set(addresses))
    })

    if (res?.success && res?.data?.length) {
      const resultLabels: AddressLabel[] = res.data
      filteredElements.each(function () {
        const address = $(this).text().trim()
        const match = resultLabels.find((item: AddressLabel) => {
          return item.address === address
        })
        if (match) {
          $(this).empty()
          $(this).attr('data-label', match.label)
          const rootEl = $('<span></span>')
          $(this).append(rootEl)
          createRoot(rootEl[0]).render(
            <ConfigProvider
              prefixCls="metadock"
              theme={{
                token: {
                  fontSize: 12
                }
              }}
            >
              <Tooltip
                overlayInnerStyle={{ width: 288 }}
                title={
                  <div className="flex-column align-center">
                    <div>{match.label}</div>
                    <div>{match.address}</div>
                  </div>
                }
                className="align-center"
              >
                <TokenSymbol logo={match.logo} />
                <span className="flex1">{getSubStr(match.label, [6])}</span>
              </Tooltip>
            </ConfigProvider>
          )
        }
      })
    }
  }
}

export default genEnhancedLabels
