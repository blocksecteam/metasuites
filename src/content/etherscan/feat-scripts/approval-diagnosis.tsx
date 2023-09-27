import { createRoot } from 'react-dom/client'
import browser from 'webextension-polyfill'

import {
  GET_TOKEN_APPROVAL_DATATABLE,
  GET_APPROVAL_RISK,
  ApprovalRiskLevel,
  APPROVAL_RISK_OPTIONS,
  GET_TOKEN_APPROVAL_ERC20_FILTER,
  APPROVAL_DIAGNOSIS_SUPPORT_LIST
} from '@common/constants'
import { chromeEvent } from '@common/event'
import type { ApprovalsRiskReq, ApprovalRisk } from '@common/api/types'
import { widthScanV2Tooltip } from '@common/hoc'
import { getHrefQueryVariable } from '@common/utils'

import { ApprovalDiagnosisBtn } from '../components'

const setBtn = (txHashEl: HTMLElement, mainAddress: string) => {
  const btnRootEl = document.createElement('div')
  btnRootEl.style.display = 'inline-block'
  btnRootEl.classList.add('mt-2')
  btnRootEl.style.verticalAlign = 'bottom'
  txHashEl?.appendChild(btnRootEl)
  createRoot(btnRootEl).render(<ApprovalDiagnosisBtn address={mainAddress} />)
}

export const genApprovalDiagnosisBtn = async (chain: string) => {
  if (!APPROVAL_DIAGNOSIS_SUPPORT_LIST.includes(chain)) return
  const isContract = !!document.querySelector(
    '#ContentPlaceHolder1_li_contracts'
  )
  if (isContract) return
  const mainAddress =
    document.querySelector<HTMLElement>('#mainaddress')?.innerText
  if (!mainAddress) return
  const txHashEl = document.querySelector<HTMLElement>(
    '#content > section.container-xxl'
  )
  if (txHashEl) {
    setBtn(txHashEl, mainAddress)
  }
}

/** review approval of all tokens */
const switchAllApprovals = () => {
  const input = document.querySelector<HTMLInputElement>(
    '#erc20_showall_approvals_switch'
  )
  if (input) {
    Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'checked'
    )?.set?.call(input, true)
    const event = new Event('click', { bubbles: true })
    input.dispatchEvent(event)
  }
}

const genRiskLabels = async (chain: string) => {
  const addressEls = document.querySelectorAll<HTMLElement>(
    '.table-responsive table tbody tr td:nth-of-type(4) a.hash-tag'
  )
  const approvers: ApprovalsRiskReq = []
  for (let i = 0; i < addressEls.length; ++i) {
    const el = addressEls[i]
    const address = el.getAttribute('data-bs-title')
    if (
      address &&
      approvers.findIndex(item => item.address === address) === -1
    ) {
      approvers.push({
        address,
        chain
      })
    }
  }
  if (approvers.length) {
    const res = await chromeEvent.emit<
      typeof GET_APPROVAL_RISK,
      ApprovalRisk[]
    >(GET_APPROVAL_RISK, approvers)
    if (res?.success && res?.data?.length) {
      res.data
        .filter(item => item.risk === ApprovalRiskLevel.HIGH)
        .forEach(item => {
          addressEls.forEach(el => {
            const dataBsTitle = el.getAttribute('data-bs-title')
            if (item.address === dataBsTitle) {
              el.parentNode?.childNodes.forEach(item => {
                if (item.nodeName === 'I') {
                  const iEl = item as HTMLElement
                  const nativeDanger =
                    iEl.getAttribute('class')?.indexOf('text-danger') !== -1
                  if (!nativeDanger) {
                    iEl.setAttribute(
                      'class',
                      'fas fa-exclamation-triangle text-danger me-1'
                    )
                  }
                }
              })
              el = widthScanV2Tooltip(el)
              el.classList.add('text-danger')
              const dangerTip = Object.values(APPROVAL_RISK_OPTIONS).find(
                opt => opt.value === item.risk
              )?.desc
              if (dangerTip) el.setAttribute('data-bs-title', dangerTip)
            }
          })
        })
    }
  }
}

/** Show approval diagnosis */
export const inspectTokenApprovals = (chain: string) => {
  /** Only the first mount is automatically switched */
  let switchFlag = false
  const type = getHrefQueryVariable(window.location.href, 'type')
  const input = document.querySelector<HTMLInputElement>(
    '#erc20_showall_approvals_switch'
  )
  if ((type === '0' || type === null) && !input?.checked) {
    switchAllApprovals()
  } else {
    genRiskLabels(chain)
  }
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === GET_TOKEN_APPROVAL_DATATABLE) {
      genRiskLabels(chain)
    }
    if (message === GET_TOKEN_APPROVAL_ERC20_FILTER) {
      if (type !== '0' && !switchFlag) {
        switchAllApprovals()
        switchFlag = true
      }
    }
    sendResponse()
  })
}
