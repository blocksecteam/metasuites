import { createRoot } from 'react-dom/client'

import { pickAddress } from '@common/utils'

import { DownloadSourceCodeBtn } from '../components'

/** download contract source code as zip */
const genDownloadSourceCodeBtn = async (chain: string) => {
  const mainAddress = pickAddress(window.location.pathname)

  if (!mainAddress) return

  const contractCodeEl = document.querySelector<HTMLElement>(
    '#ContentPlaceHolder1_contractCodeDiv'
  )

  /** only contract and Verified can be downloaded */
  if (!contractCodeEl) return

  const parentEl = document.querySelector<HTMLElement>(
    '#dividcode > div:first-child > div:first-child > div'
  )

  if (parentEl) {
    const rootEl = document.createElement('div')
    parentEl.style.display = 'flex'
    parentEl.prepend(rootEl)

    createRoot(rootEl).render(
      <DownloadSourceCodeBtn chain={chain} address={mainAddress} />
    )
  }
}

export default genDownloadSourceCodeBtn
