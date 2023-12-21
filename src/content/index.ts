import { isMatchURL } from '@common/utils'
import allowlist from '@common/config/allowlist'
import { initBlockSec } from '@src/content/blocksec'
import { initOpensea } from '@src/content/opensea'
import { initBTCExplorer } from '@src/content/btc'
import { initTronscan } from '@src/content/tronscan'
import { initSnowtrace } from '@src/content/snowtrace'

const currentUrl = window.location.href

if (isMatchURL(currentUrl, allowlist.BTC_EXPLORER_MATCHES)) {
  initBTCExplorer()
} else if (isMatchURL(currentUrl, allowlist.BLOCKSEC_MATCHES)) {
  initBlockSec()
} else if (isMatchURL(currentUrl, allowlist.OPENSEA_MATCHES)) {
  initOpensea()
} else if (isMatchURL(currentUrl, allowlist.TRONSCAN_MATCHES)) {
  initTronscan()
} else if (isMatchURL(currentUrl, allowlist.SNOWTRACE_MATCHES)) {
  initSnowtrace()
}
