import { isMatchURL } from '@common/utils'
import allowlist from '@common/config/allowlist'
import { initBlockSec } from '@src/content/blocksec'
import { initOpensea } from '@src/content/opensea'
import { initBTCExplorer } from '@src/content/btc'
import { initTronscan } from '@src/content/tronscan'
import { initMerlin } from '@src/content/merlin'
import { initSolscan } from '@src/content/solscan'
import { initSolscanFM } from '@src/content/solanafm'
import { initSolanaExplorer } from '@src/content/solanaexpl'
import { initMetaSleuth } from '@src/content/metasleuth'
import { initDebank } from '@src/content/debank'
import { initArkham } from '@src/content/arkham'

const currentUrl = window.location.href

if (isMatchURL(currentUrl, allowlist.BTC_EXPLORER_MATCHES)) {
  initBTCExplorer()
} else if (isMatchURL(currentUrl, allowlist.BLOCKSEC_MATCHES)) {
  initBlockSec()
} else if (isMatchURL(currentUrl, allowlist.OPENSEA_MATCHES)) {
  initOpensea()
} else if (isMatchURL(currentUrl, allowlist.TRONSCAN_MATCHES)) {
  initTronscan()
} else if (isMatchURL(currentUrl, allowlist.MERLIN_SCAN_MATCHES)) {
  initMerlin()
} else if (isMatchURL(currentUrl, allowlist.MS_MATCHES)) {
  initMetaSleuth()
} else if (isMatchURL(currentUrl, allowlist.SOLSCAN_MATCHES)) {
  initSolscan()
} else if (isMatchURL(currentUrl, allowlist.SOLANAFM_MATCHES)) {
  initSolscanFM()
} else if (isMatchURL(currentUrl, allowlist.SOLANA_EXPLORER_MATCHES)) {
  initSolanaExplorer()
} else if (isMatchURL(currentUrl, allowlist.DEBANK_MATCHES)) {
  initDebank()
} else if (isMatchURL(currentUrl, allowlist.ARKHAM_MATCHES)) {
  initArkham()
}
