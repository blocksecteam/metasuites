import { createRoot } from 'react-dom/client'

import { DownloadSourceCodeBtn } from '../components'

const genDownloadSourceCodeBtn = async (chain: string) => {
  const mainAddressEl = document.querySelector<HTMLElement>('#mainaddress')

  const mainAddress = mainAddressEl?.innerText

  if (!mainAddress) return

  const contractCodeEl = document.querySelector<HTMLElement>(
    '#ContentPlaceHolder1_contractCodeDiv'
  )

  /** only contract and Verified can be downloaded */
  if (!contractCodeEl) return

  const parentEl = document.querySelector<HTMLElement>(
    '#dividcode > div:first-child > div:first-child > div'
  )

  const rootEl = document.createElement('div')
  rootEl.style.display = 'inline-block'
  parentEl?.prepend(rootEl)

  createRoot(rootEl).render(
    <DownloadSourceCodeBtn chain={chain} address={mainAddress} />
  )
}

export default genDownloadSourceCodeBtn
