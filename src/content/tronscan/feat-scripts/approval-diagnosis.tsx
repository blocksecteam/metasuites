import { createRoot } from 'react-dom/client'
import $ from 'jquery'
import { Tooltip, ConfigProvider } from 'antd'
import browser from 'webextension-polyfill'
import { flushSync } from 'react-dom'
import { uniqBy } from 'lodash-es'

import {
  GET_APPROVAL_RISK,
  ApprovalRiskLevel,
  LOAD_TRON_APPROVALS
} from '@common/constants'
import { chromeEvent } from '@common/event'
import type { ApprovalsRiskReq, ApprovalRisk } from '@common/api/types'

import { ApprovalDiagnosisBtn } from '../components'
import { lazyLoad } from '../helper'

export const genApprovalDiagnosisBtn = async (
  container: JQuery<HTMLElement>
) => {
  const rootEl = $('<div></div>')
  container.append(rootEl)
  createRoot(rootEl[0]).render(<ApprovalDiagnosisBtn />)
}

export const genApprovalRiskLabels = () => {
  const main = async () => {
    const addressEls = $(
      '#address-approval-list .approval-item .address-link'
    ).not('.risk')
    const approvers: ApprovalsRiskReq = addressEls
      .map(function () {
        return $(this).text().trim()
      })
      .get()
      .map(address => ({ address, chain: 'tron' }))

    if (approvers.length) {
      const res = await chromeEvent.emit<
        typeof GET_APPROVAL_RISK,
        ApprovalRisk[]
      >(GET_APPROVAL_RISK, uniqBy(approvers, 'address'))
      if (res?.success && res?.data?.length) {
        res.data
          .filter(item => item.risk === ApprovalRiskLevel.HIGH)
          .forEach(item => {
            addressEls.each(function () {
              $(this).addClass('risk')

              if ($(this).text().trim() === item.address) {
                const rootEl = $('<div></div>')

                const labelEl = $(this)
                  .closest('.approval-item')
                  .children()
                  .first()

                const oLabel = labelEl.text()
                item.label = item.label || oLabel

                labelEl.append(rootEl)
                labelEl.replaceWith(rootEl)

                flushSync(() => {
                  createRoot(rootEl[0]).render(
                    <ConfigProvider prefixCls="metadock">
                      <Tooltip title="This approval has been granted for a suspicious or risky address. If you were not aware of this approval, please revoke it for your asset security.">
                        <div
                          style={{ color: 'rgb(194, 54, 49)' }}
                          className="text-ellipsis"
                          title={item.label}
                        >
                          {item.label}
                        </div>
                      </Tooltip>
                    </ConfigProvider>
                  )
                })
              }
            })
          })
      }
    }
  }

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === LOAD_TRON_APPROVALS) {
      lazyLoad(main, '#mainContent #tab_data_list #loadingVideo')
      sendResponse()
    }
  })
}
