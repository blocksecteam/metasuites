import { isMatchURL } from '@common/utils'
import allowlist from '@common/config/allowlist'
import { initEtherscanV2 } from '@src/content/etherscan'
import { initBlockscout } from '@src/content/blockscout'
import { initEtherscanV1 } from '@src/content/scans'

const currentUrl = window.location.href

if (isMatchURL(currentUrl, allowlist.ETHERSCAN_V1_MATCHES)) {
  initEtherscanV1()
} else if (isMatchURL(currentUrl, allowlist.ETHERSCAN_V2_MATCHES)) {
  initEtherscanV2()
} else if (isMatchURL(currentUrl, allowlist.BLOCKSCOUT_MATCHES)) {
  initBlockscout()
}
