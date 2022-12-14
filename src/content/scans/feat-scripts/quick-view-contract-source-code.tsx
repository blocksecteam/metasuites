import { createRoot } from 'react-dom/client'

import { QuickViewSourceCodeBtn } from '../components'

const genQuickViewSourceCodeBtn = async (chain: string) => {
  const mainAddressEl = document.querySelector<HTMLElement>('#mainaddress')

  const mainAddress = mainAddressEl?.innerText

  if (!mainAddress) return

  const contractCodeEl = document.querySelector<HTMLElement>(
    '#ContentPlaceHolder1_contractCodeDiv'
  )

  /** only contract and Verified can be downloaded */
  if (!contractCodeEl) return

  const chain_supportd:string[] = ["eth", "bsc", "polygon", "fantom", "optimism", "arbitrum"]

  if (!chain_supportd.includes(chain)) return

  const parentEl = document.querySelector<HTMLElement>(
    '#dividcode > div:first-child > div:first-child > div'
  )

  const rootEl = document.createElement('div')
  rootEl.style.display = 'inline-block'
  parentEl?.prepend(rootEl)

  createRoot(rootEl).render(
    <QuickViewSourceCodeBtn chain={chain} address={mainAddress} />
  )
}

export default genQuickViewSourceCodeBtn
