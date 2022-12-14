import { createRoot } from 'react-dom/client'

import { ETHERSCAN_DETH_SUPPORT_LIST } from '@common/constants'

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

  const dethItem = ETHERSCAN_DETH_SUPPORT_LIST.find(
    item => item.chain === chain
  )

  if (dethItem) {
    const href = `${dethItem.scanHrefPrefix}/${mainAddress}`

    const parentEl = document.querySelector<HTMLElement>(
      '#dividcode > div:first-child > div:first-child > div'
    )

    const rootEl = document.createElement('div')
    parentEl?.prepend(rootEl)

    createRoot(rootEl).render(<QuickViewSourceCodeBtn href={href} />)
  }
}

export default genQuickViewSourceCodeBtn
