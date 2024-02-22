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

  const separatorEl = $('#meta-suites__tx-explorer-separator')
  const linkEl = $('#meta-suites__tx-explorer-link')

  const href = `https://phalcon.blocksec.com/explorer/tx/${phalconPathname}/${txHash}`

  separatorEl.css('display', 'block')
  linkEl.css('display', 'block')

  createRoot(linkEl[0]).render(
    <ExplorerLink
      name="Phalcon"
      href={href}
      iconUrl="https://assets.blocksec.com/image/1691562334877-2.svg"
    />
  )
}

export default genQuick2parsers
