import { store } from '@src/store'
import { SCAN_PAGES } from '@common/constants'

/** main features */
import {
  genComplianceScoresBtn,
  genFundFlow,
  genEnhancedLabels,
  genDownloadSourceCodeBtn,
  genQuickViewSourceCodeBtn,
  genMainAddressLabel,
  genEnhancedSignatures,
  genDeBankBtn,
  genDecompileInDedaubBtn,
  convertUTC2locale,
  genCopyAddressBtn
} from '../feat-scripts'

const initAddressPageScript = async (chain: string) => {
  /** get user options */
  const {
    complianceScores,
    fundFlow,
    enhancedLabels,
    enhancedSignatures,
    contractSourcecode,
    quick2debank,
    decompileInDedaub,
    utc2locale,
    copyAddress
  } = await store.get('options')

  if (enhancedSignatures) genEnhancedSignatures(chain)

  /** enhanced main address label */
  if (enhancedLabels) {
    genMainAddressLabel(chain)
    genEnhancedLabels(chain)
  }
  /** address compliance score*/
  if (complianceScores) genComplianceScoresBtn(chain)
  /** fund flow */
  if (fundFlow) genFundFlow(chain)

  /** download contract source code as zip */
  if (contractSourcecode) {
    genDownloadSourceCodeBtn(chain)
    genQuickViewSourceCodeBtn(chain)
  }

  /** open in debank.com */
  if (quick2debank) genDeBankBtn()

  /** decompile by library.dedaub.com */
  if (decompileInDedaub) genDecompileInDedaubBtn(chain)

  /** UTC date to local date */
  if (utc2locale) convertUTC2locale(SCAN_PAGES.ADDRESS.name)

  /** show copy icon for addresses */
  if (copyAddress) genCopyAddressBtn(SCAN_PAGES.ADDRESS.name)
}

export default initAddressPageScript
