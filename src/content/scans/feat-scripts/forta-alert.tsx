import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import type { FortaAlertRes, FortaAlertReq } from '@common/api/types'
import { GET_FORTA_ALERT, ETHERSCAN_PAGES } from '@common/constants'
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
    '#content > .container > div:first-child > div:first-child > div'
  )

  const mainAddress = mainAddressEl?.innerText

  if (!mainAddress || !containerEl) return

  const res = await getFortaAlerts({
    chain: chain,
    address: mainAddress
  })

  res.forEach(item => {
    const labelRootEl = document.createElement('div')
    labelRootEl.style.display = 'inline-block'
    labelRootEl.classList.add('mt-1')
    containerEl?.appendChild(labelRootEl)
    createRoot(labelRootEl).render(
      <FortaAlertLabel label={item.label} alertUrl={item.alertUrl} />
    )
  })
}

export const genTxFortaAlertTip = async (chain: string) => {
  const txHashEl = document.querySelector<HTMLElement>(
    '#ContentPlaceHolder1_maintable > div > div:nth-child(2)'
  )
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

const handleAlerts = async (
  chain: string,
  elements: HTMLElement[],
  useAntd = true
) => {
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
        if (useAntd) {
          warningRootEl.style.display = 'contents'
          el.prepend(warningRootEl)
        } else {
          warningRootEl.style.float = 'left'
          el.parentElement?.parentElement?.prepend(warningRootEl)
        }
        createRoot(warningRootEl).render(
          <FortaAlertWarningSymbol alertUrl={item.alertUrl} useAntd={useAntd} />
        )
      }
    })
  })
}

export const scanTxnFortaAlert = async (chain: string, pageName: string) => {
  const txnTags: HTMLElement[] = []
  switch (pageName) {
    case ETHERSCAN_PAGES.TOKEN.name: {
      txnTags.push(
        ...document.querySelectorAll<HTMLElement>(
          '#maindiv table tbody tr td:nth-of-type(1) .hash-tag > a'
        )
      )
      const dexTrackerIframe =
        document.querySelector<HTMLIFrameElement>('#dextrackeriframe')
      dexTrackerIframe?.addEventListener(
        'load',
        function () {
          const _document = dexTrackerIframe?.contentWindow?.document
          if (_document) {
            const iframeTxnTags = _document.querySelectorAll<HTMLElement>(
              '#body .table-responsive table tbody tr td:nth-of-type(1) a'
            )
            handleAlerts(chain, [...iframeTxnTags], false)
          }
        },
        true
      )
      break
    }
    case ETHERSCAN_PAGES.ADDRESS.name: {
      const transactionsTags = document.querySelectorAll<HTMLElement>(
        '.card table tbody a.myFnExpandBox_searchVal'
      )
      const internalTxnTags = document.querySelectorAll<HTMLElement>(
        "#ContentPlaceHolder1_divinternaltxtable table tbody tr td:nth-of-type(1) a.hash-tag[href^='/tx/']"
      )
      txnTags.push(...[...transactionsTags, ...internalTxnTags])
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
                  '.hash-tag.myFnExpandBox_searchVal > a'
                )
                handleAlerts(chain, [...iframeTxnTags], false)
              }
            },
            true
          )
        }
      }
      break
    }
    case ETHERSCAN_PAGES.TXS.name:
    case ETHERSCAN_PAGES.TOKENTXNS.name: {
      txnTags.push(
        ...document.querySelectorAll<HTMLElement>(
          '.card table tbody a.myFnExpandBox_searchVal'
        )
      )
      break
    }
  }
  handleAlerts(chain, [...txnTags])
}
