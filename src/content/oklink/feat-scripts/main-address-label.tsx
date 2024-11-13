import type { CallbackResponse } from 'chrome-extension-core/lib/event'
import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import type { AddressLabel } from '@common/api/types'
import { GET_IMPL_LABELS } from '@common/constants'

import { MainAddressLabel } from '../components'
import CHAIN from '../constant/chain'
import META_SUITES_CLASS, { META_SUITES_DONE } from '../constant/metaSuites'
import { createTimerFn } from '../utils'

const getAddressLabelDom = () => {
  const dom = document.querySelector(META_SUITES_CLASS.addressLabel)
  dom?.classList.add(META_SUITES_DONE)
  return dom
}

/** enhanced address label */
const genMainAddressLabel = async (mainAddress: string | undefined) => {
  if (!mainAddress) return
  const chain = CHAIN.chain
  createTimerFn(async () => {
    const addressLabelDom = getAddressLabelDom()
    if (!addressLabelDom) return
    await chromeEvent
      .emit(GET_IMPL_LABELS, { chain: chain, addresses: [mainAddress] })
      .then((res: CallbackResponse<AddressLabel[]> | undefined) => {
        if (res?.success && res.data.length) {
          const label = res.data[0].label
          if (label) {
            createRoot(addressLabelDom).render(
              <MainAddressLabel data={res.data[0]} />
            )
          }
        }
      })
  })()
}

export default genMainAddressLabel
