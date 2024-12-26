import { createRoot } from 'react-dom/client'

import { isSupportParsers } from '@common/utils'

import ParsersBtn from '../components/ParsersBtn'
import CHAIN from '../constant/chain'
import { createTimerFn } from '../utils'
import META_SUITES_CLASS, { META_SUITES_DONE } from '../constant/metaSuites'

const getTxHeaderLinkBox = () => {
  const dom = document.querySelector<HTMLElement>(
    META_SUITES_CLASS.txHeaderLinkBox
  )
  dom?.classList.add(META_SUITES_DONE)
  return dom
}

const genQuick2parsersBtn = () => {
  if (!isSupportParsers(CHAIN.chain)) return
  createTimerFn(() => {
    const txHashEl = getTxHeaderLinkBox()
    if (!txHashEl) return
    const rootEl = document.createElement('div')
    rootEl.style.display = 'inline-flex'
    rootEl.style.verticalAlign = 'middle'
    txHashEl.appendChild(rootEl)
    createRoot(rootEl).render(<ParsersBtn chain={CHAIN.chain} />)
  }, 1000)()
}

export default genQuick2parsersBtn
