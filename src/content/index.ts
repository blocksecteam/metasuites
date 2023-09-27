import { isMatchURL } from '@common/utils'
import allowlist from '@common/config/allowlist'
import { initBlocksec } from '@src/content/blocksec'
import { initOpensea } from '@src/content/opensea'
import { initBTCExplorer } from '@src/content/btc'

const currentUrl = window.location.href

if (isMatchURL(currentUrl, allowlist.BTC_EXPLORER_MATCHES)) {
  initBTCExplorer()
} else if (isMatchURL(currentUrl, allowlist.BLOCKSEC_MATCHES)) {
  initBlocksec()
} else if (isMatchURL(currentUrl, allowlist.OPENSEA_MATCHES)) {
  initOpensea()
}
