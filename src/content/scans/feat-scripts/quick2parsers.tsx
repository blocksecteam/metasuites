import { createRoot } from 'react-dom/client'

import { isSupportParsers } from '@common/utils'

import ParsersBtn from '../components/ParsersBtn'

const genQuick2parsersBtn = (chain: string) => {
  if (!isSupportParsers(chain)) return
  const txHashEl = document.querySelector<HTMLElement>(
    '#ContentPlaceHolder1_maintable > div > div:nth-child(2)'
  )
  const jsClipboardEl = txHashEl?.querySelector<HTMLElement>('.js-clipboard')
  if (jsClipboardEl) {
    jsClipboardEl.style.marginRight = '20px'
  }
  if (txHashEl) {
    const rootEl = document.createElement('div')
    rootEl.style.display = 'inline-block'
    txHashEl.appendChild(rootEl)
    createRoot(rootEl).render(<ParsersBtn chain={chain} />)
  }
}

export default genQuick2parsersBtn
