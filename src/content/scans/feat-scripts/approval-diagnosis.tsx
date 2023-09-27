import { createRoot } from 'react-dom/client'

import {
  GET_APPROVAL_RISK,
  ApprovalRiskLevel,
  APPROVAL_RISK_OPTIONS,
  APPROVAL_DIAGNOSIS_SUPPORT_LIST
} from '@common/constants'
import { chromeEvent } from '@common/event'
import type { ApprovalsRiskReq, ApprovalRisk } from '@common/api/types'

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
  const containerEl = document.querySelector<HTMLElement>(
    '#content > div.container'
  )
  if (containerEl) {
    setBtn(containerEl, mainAddress)
  }
}

/** Show approval diagnosis */
export const inspectTokenApprovals = async (chain: string) => {
  const addressEls = document.querySelectorAll<HTMLElement>(
    'table#mytable tbody tr td:nth-of-type(4) .hash-tag'
  )
  const approvers: ApprovalsRiskReq = []
  for (let i = 0; i < addressEls.length; ++i) {
    const el = addressEls[i]
    const address = el.getAttribute('data-original-title')
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
            const dataOriginalTitle = el.getAttribute('data-original-title')
            if (item.address === dataOriginalTitle) {
              el.classList.add('text-danger')
              const dangerTip = Object.values(APPROVAL_RISK_OPTIONS).find(
                opt => opt.value === item.risk
              )?.desc
              if (dangerTip) el.setAttribute('data-original-title', dangerTip)
              const warningIconEl = document.createElement('i')
              warningIconEl.setAttribute(
                'class',
                'fas fa-exclamation-triangle text-danger me-1'
              )
              warningIconEl.style.marginRight = '0.25rem'
              el.prepend(warningIconEl)
            }
          })
        })
    }
  }
}
