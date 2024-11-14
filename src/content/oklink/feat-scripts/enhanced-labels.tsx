import { createRoot } from 'react-dom/client'

import { isAddress } from '@common/utils'
import { chromeEvent } from '@common/event'
import { GET_ADDRESS_LABELS } from '@common/constants'
import type { AddressLabel } from '@src/common/api/types'
import CHAIN from '../constant/chain'
import { ADDRESS_ATTR } from '../constant/enum'
import { getAddressParentDomArr } from '../utils/dom'
import META_SUITES_CLASS from '../constant/metaSuites'
import AddressLabels from '../components/AddressLabels'
import { createTimerFn } from '../utils'

const handleReplace = async (elements: HTMLElement[], queryList: string[]) => {
  if (!queryList.length) return
  const res = await chromeEvent.emit<typeof GET_ADDRESS_LABELS, AddressLabel[]>(
    GET_ADDRESS_LABELS,
    {
      chain: CHAIN.chain,
      addresses: queryList
    }
  )
  if (!res?.success) return

  const resultLabels = res.data
  resultLabels.forEach(item => {
    const { address, label } = item
    elements.forEach(el => {
      if (address === el.getAttribute(ADDRESS_ATTR)) {
        const addressDom = el.querySelector(
          META_SUITES_CLASS.address
        ) as HTMLElement | null
        if (addressDom) {
          addressDom.innerHTML = ''
          createRoot(addressDom).render(
            <AddressLabels address={address} label={label} />
          )
        }
      }
    })
  })
}

/** enhanced address label */
const genEnhancedLabels = () => {
  createTimerFn(() => {
    const addressDomList = getAddressParentDomArr()
    if (!addressDomList.length) return
    const queryList: string[] = []
    addressDomList.forEach(addressDom => {
      const address = addressDom.getAttribute(ADDRESS_ATTR) || ''
      if (isAddress(address) && queryList.indexOf(address) === -1) {
        queryList.push(address)
      }
    })
    handleReplace(addressDomList, queryList)
  })()
}

export default genEnhancedLabels
