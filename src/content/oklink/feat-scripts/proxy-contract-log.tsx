import { createRoot } from 'react-dom/client'
import { ProxyLogReference } from '@src/content/oklink/components'
import { PROXY_LOG_SUPPORT_LIST } from '@common/constants'
import CHAIN from '../constant/chain'
import { createTimerFn } from '../utils'
import { getContractTabsDom } from '../utils/dom'

/** Show proxy log */
const genProxyContractLog = (address: string) => {
  const chain = CHAIN.chain
  if (!PROXY_LOG_SUPPORT_LIST.includes(chain)) return
  createTimerFn(() => {
    const tabsEl = getContractTabsDom()
    if (!tabsEl) {
      return
    }
    const aLinks = tabsEl?.querySelectorAll('a')
    let flag = true
    aLinks?.forEach(aLink => {
      if (aLink.href.includes('proxy')) {
        flag = false
      }
    })
    if (flag) {
      return
    }

    const rootEl = document.createElement('div')
    tabsEl.append(rootEl)
    createRoot(rootEl).render(
      <ProxyLogReference chain={chain} address={address} />
    )
  })()
}

export default genProxyContractLog
