import { createRoot } from 'react-dom/client'
import { chromeEvent } from '@common/event'
import {
  GET_PRIVATE_VARIABLES,
  VARIABLE_LOG_SUPPORT_LIST
} from '@common/constants'
import type {
  PostPrivateVariablesParams,
  PrivateVariablesRes
} from '@common/api/types'

import { store } from '@src/store'
import CHAIN from '../constant/chain'
import { getReadContractBoxDom } from '../utils/dom'
import { createTimerFn } from '../utils'
import { PROXY_ADDRESS_ATTR } from '../constant/enum'
import { ReadContractAccordionItem } from '../components'
import META_SUITES_CLASS from '../constant/metaSuites'

const genContractPrivateVariables = (address: string) => {
  const chain = CHAIN.chain
  if (!VARIABLE_LOG_SUPPORT_LIST.includes(chain)) return
  createTimerFn(async () => {
    const { utc2locale } = await store.get('options')
    const readContractBox = getReadContractBoxDom()
    const readContractItems = readContractBox?.querySelectorAll(
      META_SUITES_CLASS.contractItem
    )
    if (!readContractBox) {
      return
    }
    const proxyAddressDom = document.querySelector(`[${PROXY_ADDRESS_ATTR}]`)
    const implAddress =
      proxyAddressDom?.getAttribute(PROXY_ADDRESS_ATTR) || undefined
    const isProxy = !!proxyAddressDom
    if (isProxy && !implAddress) {
      return
    }

    const params: PostPrivateVariablesParams = {
      chain: chain,
      address: address,
      implAddress
    }
    const res = await chromeEvent.emit<
      typeof GET_PRIVATE_VARIABLES,
      PrivateVariablesRes
    >(GET_PRIVATE_VARIABLES, params)
    if (res?.success && res?.data) {
      res.data.forEach((variable, index) => {
        const rootEl = document.createElement('div')
        readContractBox.append(rootEl)
        createRoot(rootEl).render(
          <ReadContractAccordionItem
            utc2locale={utc2locale}
            chain={chain}
            implAddress={implAddress}
            address={address}
            data={variable}
            id={`accordion-${Number(readContractItems?.length) + 1 + index}`}
          />
        )
      })
    }
  })()
}

export default genContractPrivateVariables
