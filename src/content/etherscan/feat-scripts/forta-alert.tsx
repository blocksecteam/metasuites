import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import type { FortaAlertRes, FortaAlertReq } from '@common/api/types'
import { GET_FORTA_ALERT } from '@common/constants'
import { validOrigin, getNodeValue } from '@common/utils'

import {
  FortaAlertLabel,
  FortaAlertTip,
  FortaAlertWarningSymbol
} from '../components'

const getFortaAlerts = async (params: FortaAlertReq) => {
  const res = await chromeEvent.emit<typeof GET_FORTA_ALERT, FortaAlertRes>(
    GET_FORTA_ALERT,
    params
  )
  if (res?.success && res?.data.length) {
    return res.data
  }
  return []
}

export const genMainAddressFortaLabels = async (chain: string) => {
  const mainAddressEl = document.querySelector<HTMLElement>('#mainaddress')

  const containerEl = document.querySelector(
    '#ContentPlaceHolder1_divSummary > div:first-child > div:first-child'
  )

  const mainAddress = mainAddressEl?.innerText

  if (!mainAddress || !containerEl) return

  const res = await getFortaAlerts({
    chain: chain,
    address: mainAddress
  })

  if (res.length) {
    document
      .querySelector('#ContentPlaceHolder1_divSummary > div')
      ?.removeAttribute('style')
  }

  res.forEach(item => {
    const labelRootEl = document.createElement('div')
    labelRootEl.style.display = 'inline-block'
    containerEl?.appendChild(labelRootEl)
    createRoot(labelRootEl).render(
      <FortaAlertLabel label={item.label} alertUrl={item.alertUrl} />
    )
  })
}

export const genTxFortaAlertTip = async (chain: string) => {
  const txHashEl =
    document.querySelector<HTMLElement>('#referralLink-1')?.parentElement
  const txn = getNodeValue(document.querySelector<HTMLElement>('#spanTxHash'))

  if (txHashEl && txn) {
    const res = await getFortaAlerts({
      chain: chain,
      txHashes: [txn]
    })
    if (res.length) {
      const subscribeUrl = res[0].subscribeUrl
      const alertUrl = res[0].alertUrl
      const tipRootEl = document.createElement('div')
      txHashEl.appendChild(tipRootEl)
      createRoot(tipRootEl).render(
        <FortaAlertTip alertUrl={alertUrl} subscribeUrl={subscribeUrl} />
      )
    }
  }
}

const handleAlerts = async (chain: string, elements: HTMLElement[]) => {
  const txHashes: string[] = []
  elements.forEach(el => {
    const value = getNodeValue(el)
    if (value && !txHashes.includes(value)) {
      txHashes.push(value)
    }
  })
  if (!txHashes.length) return
  const res = await getFortaAlerts(
    Object.assign({
      chain: chain,
      txHashes: txHashes
    })
  )

  res.forEach(item => {
    elements.forEach(el => {
      const value = getNodeValue(el)
      if (value === item.txHash) {
        const warningRootEl = document.createElement('span')
        warningRootEl.style.float = 'left'
        el.parentElement?.parentElement?.prepend(warningRootEl)
        createRoot(warningRootEl).render(
          <FortaAlertWarningSymbol alertUrl={item.alertUrl} />
        )
      }
    })
  })
}

export const scanTxnFortaAlert = async (chain: string) => {
  const txnTags = document.querySelectorAll<HTMLElement>(
    '.card table tbody a.myFnExpandBox_searchVal'
  )
  handleAlerts(chain, [...txnTags])
  const iframes = document.querySelectorAll('iframe')
  for (let i = 0; i < iframes.length; ++i) {
    const iframe = iframes[i]
    if (validOrigin(iframe.src)) {
      iframe.addEventListener(
        'load',
        function () {
          const _document = iframe?.contentWindow?.document
          if (_document) {
            const iframeTxnTags = _document.querySelectorAll<HTMLElement>(
              ".table-responsive table tbody a.myFnExpandBox_searchVal, .table-responsive table tbody span.myFnExpandBox_searchVal > a[href*='tx/']"
            )
            handleAlerts(chain, [...iframeTxnTags])
          }
        },
        true
      )
    }
  }
}
