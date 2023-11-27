import { createRoot } from 'react-dom/client'

import {
  ETHERSCAN_PAGES,
  ALTERNATIVE_BLOCK_EXPLORES_SUPPORT_LIST
} from '@common/constants'

import { AlternativeBlockExplorersBtn } from '../components'

const setBtn = (containerEl: HTMLElement, block: string) => {
  const btnRootEl = document.createElement('div')
  btnRootEl.style.marginLeft = '20px'
  containerEl.setAttribute('style', 'display: flex;align-items:center')
  containerEl?.appendChild(btnRootEl)
  createRoot(btnRootEl).render(<AlternativeBlockExplorersBtn block={block} />)
}

/** Show alternative block explorers */
const genAlternativeBlockExplorersBtn = async (
  pageName: string,
  chain: string
) => {
  if (!ALTERNATIVE_BLOCK_EXPLORES_SUPPORT_LIST.includes(chain)) return
  switch (pageName) {
    case ETHERSCAN_PAGES.BLOCK.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          '#ContentPlaceHolder1_maintable > div.row:first-child > div:last-child > div'
        )
        const block =
          containerEl?.querySelector<HTMLElement>('span:first-child')?.innerText
        if (containerEl && block) {
          setBtn(containerEl, block)
        }
      }
      break
    case ETHERSCAN_PAGES.TX.name:
      {
        const containerEl = document.querySelector<HTMLElement>(
          "#ContentPlaceHolder1_maintable span[data-original-title*='Number of blocks']"
        )?.parentElement
        const block = containerEl?.querySelector<HTMLElement>('a')?.innerText
        if (containerEl && block) {
          setBtn(containerEl, block)
        }
      }
      break
  }
}

export default genAlternativeBlockExplorersBtn
