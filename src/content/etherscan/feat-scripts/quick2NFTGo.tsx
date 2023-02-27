import { createRoot } from 'react-dom/client'

import { chromeEvent } from '@common/event'
import { GET_NFT_INFO } from '@common/constants'
import type { NFTInfoRes } from '@common/api/types'

import { NFTGoBtn } from '../components'

const setBtn = async (containerEl: HTMLElement, mainAddress: string) => {
  const res = await chromeEvent.emit<typeof GET_NFT_INFO, NFTInfoRes>(
    GET_NFT_INFO,
    mainAddress
  )
  if (res?.success && res.data) {
    const btnRootEl = document.createElement('div')
    btnRootEl.style.display = 'inline-block'
    btnRootEl.classList.add('mt-2')
    btnRootEl.style.verticalAlign = 'bottom'
    containerEl?.appendChild(btnRootEl)
    createRoot(btnRootEl).render(<NFTGoBtn url={res.data.nftGoUrl} />)
  }
}

/** Show quick open in NFTGo for NFT contracts */
const genNFTGoBtn = async () => {
  const mainAddress =
    document.querySelector<HTMLElement>('#mainaddress')?.innerText
  if (!mainAddress) return
  const containerEl = document.querySelector<HTMLElement>(
    '#content > section.container-xxl'
  )
  if (containerEl) setBtn(containerEl, mainAddress)
}

export default genNFTGoBtn
