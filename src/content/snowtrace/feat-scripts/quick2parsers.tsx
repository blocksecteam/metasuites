import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { isSupportParsers } from '@common/utils'

import ParsersBtn from '../components/ParsersBtn'

const genQuick2parsersBtn = async (chain: string) => {
  if (!isSupportParsers(chain)) return
  const txHashEl = $('.card-body .grid:nth-of-type(2) div:last-child')
  const hash = txHashEl.text().trim()
  const rootEl = $('<div></div>')
  rootEl.css({ display: 'inline-block', marginLeft: '0.5rem' })
  txHashEl.append(rootEl)
  createRoot(rootEl[0]).render(<ParsersBtn txHash={hash} chain={chain} />)
}

export default genQuick2parsersBtn
