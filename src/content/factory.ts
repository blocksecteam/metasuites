import { isMatchURL } from '@common/utils'
import { EtherscanV1Initializer } from '@src/content/scans'
import { EtherscanV2Initializer } from '@src/content/etherscan'
import { BlockscoutInitializer } from '@src/content/blockscout'
import { BTCInitializer } from '@src/content/btc'
import { BlockSecInitializer } from '@src/content/blocksec'
import { OpenseaInitializer } from '@src/content/opensea'
import { TronscanInitializer } from '@src/content/tronscan'
import { MerlinInitializer } from '@src/content/merlin'
import { MetaSleuthInitializer } from '@src/content/metasleuth'
import { SolscanInitializer } from '@src/content/solscan'
import { SolscanFMInitializer } from '@src/content/solanafm'
import { SolanaExplorerInitializer } from '@src/content/solanaexpl'
import { DebankInitializer } from '@src/content/debank'
import { ArkhamInitializer } from '@src/content/arkham'
import { JitoInitializer } from '@src/content/jito'
import { OKLinkInitializer } from '@src/content/oklink'

export type Initializer<T> = {
  matches: string[]
  new (): T
}

const createInitializerFromMap = <T>(
  url: string,
  initializers: Initializer<T>[]
) => {
  for (const initializer of initializers) {
    if (isMatchURL(url, initializer.matches)) {
      return new initializer()
    }
  }
  return null
}

export const createInitializer = (url: string, all_frames = false) => {
  const initializers = all_frames
    ? [EtherscanV1Initializer, EtherscanV2Initializer, BlockscoutInitializer]
    : [
        BTCInitializer,
        BlockSecInitializer,
        OpenseaInitializer,
        TronscanInitializer,
        MerlinInitializer,
        MetaSleuthInitializer,
        SolscanInitializer,
        SolscanFMInitializer,
        SolanaExplorerInitializer,
        DebankInitializer,
        ArkhamInitializer,
        JitoInitializer,
        OKLinkInitializer
      ]
  return createInitializerFromMap(url, initializers)
}
