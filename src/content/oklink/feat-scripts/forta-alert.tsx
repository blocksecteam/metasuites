import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import type { FortaAlertRes, FortaAlertReq } from '@common/api/types'
import { GET_FORTA_ALERT } from '@common/constants'

import { FortaAlertLabel, FortaAlertTip } from '../components'
import CHAIN from '../constant/chain'
import { createTimerFn } from '../utils'
import META_SUITES_CLASS, { META_SUITES_DONE } from '../constant/metaSuites'
import txPage from '../constant/txPage'
import { getTxTipDom } from '../utils/dom'

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

const getAddressRiskDom = () => {
  const dom = document.querySelector(META_SUITES_CLASS.addressRisk)
  dom?.classList.add(META_SUITES_DONE)
  return dom
}

export const genMainAddressFortaLabels = (mainAddress: string | undefined) => {
  if (!mainAddress) return
  const chain = CHAIN.chain
  createTimerFn(async () => {
    const rootEl = getAddressRiskDom()
    if (!rootEl) return
    const res = await getFortaAlerts({
      chain: chain,
      address: mainAddress
    })
    if (!res.length) return
    const data = res[0]
    createRoot(rootEl).render(
      <FortaAlertLabel label={data.label} alertUrl={data.alertUrl} />
    )
  }, 1000)()
}


export const genTxFortaAlertTip = async () => {
  createTimerFn(async () => {
    const txHash = txPage.hash;
    const rootEl = getTxTipDom();
    if (!rootEl || !txHash) return;
    const res = await getFortaAlerts({
      chain: CHAIN.chain,
      txHashes: [txHash]
    })
    if (res?.length) {
      const subscribeUrl = res[0].subscribeUrl
      const alertUrl = res[0].alertUrl
      createRoot(rootEl).render(
        <FortaAlertTip alertUrl={alertUrl} subscribeUrl={subscribeUrl} />
      )
    }
  })()
}