import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import type { FortaAlertRes, FortaAlertReq } from '@common/api/types'
import { GET_FORTA_ALERT } from '@common/constants'
import { validOrigin, getNodeValue } from '@common/utils'

import { FortaAlertWarningSymbol } from '../components'
import { createTimerFn } from '../utils'
import { getTxHashParentDomArr } from '../utils/dom'
import { TX_HASH_ATTR } from '../constant/enum'
import CHAIN from '../constant/chain'

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

const handleAlerts = async (elements: HTMLElement[]) => {
  const txHashes: string[] = []
  elements.forEach(txDom => {
    const txHash = txDom.getAttribute(TX_HASH_ATTR) || ''
    if (txHash && txHashes.indexOf(txHash) === -1) {
      txHashes.push(txHash)
    }
  })
  if (!txHashes.length) return
  const res = await getFortaAlerts(
    Object.assign({
      chain: CHAIN.chain,
      txHashes: txHashes
    })
  )
  res?.forEach(item => {
    elements.forEach(el => {
      const txHash = el.getAttribute(TX_HASH_ATTR) || ''
      if (item.txHash === txHash) {
        const warningRootEl = document.createElement('div')
        el.prepend(warningRootEl)
        createRoot(warningRootEl).render(
          <FortaAlertWarningSymbol alertUrl={item.alertUrl} />
        )
      }
    })
  })
}

const getTxnFortaAlert = async () => {
  createTimerFn(() => {
    const txDomList = getTxHashParentDomArr()
    if (!txDomList.length) return
    handleAlerts(txDomList)
  })()
}

export default getTxnFortaAlert
