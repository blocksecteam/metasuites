import { createRoot } from 'react-dom/client'
import $ from 'jquery'

import { ExplorerLink } from '@src/content/blockscout/components'
import { PHALCON_SUPPORT_LIST } from '@common/constants'

const genQuick2parsers = async (chain: string) => {
  const phalconPathname = PHALCON_SUPPORT_LIST.find(
    item => item.chain === chain
  )?.pathname

  if (!phalconPathname) return

  const txInfoLabelEl = $('#meta-suites__tx-info-label')
  const txHash = txInfoLabelEl.data('hash')

  if (!txHash) return

  const explorersLabelEl = $('#meta-suites__explorers-label')
  const explorersLabelFullEl = $('#meta-suites__explorers-label_full')

  let num = Number(explorersLabelEl.data('num'))

  if (!Object.is(num, NaN)) {
    num++
    explorersLabelEl.text(num)
    explorersLabelFullEl.text(`${num} Explorers`)
  }

  const href = `https://phalcon.blocksec.com/explorer/tx/${phalconPathname}/${txHash}`
  const containerEl = $('#meta-suites__explorer')

  containerEl.css('display', 'block')
  createRoot(containerEl[0]).render(
    <ExplorerLink
      name="Phalcon"
      href={href}
      iconUrl="https://assets.blocksec.com/image/1691562334877-2.svg"
    />
  )
}

export default genQuick2parsers
