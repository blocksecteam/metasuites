import { ExplorerPath } from './enum'
import { checkExplorer, getRealPathnameArray } from '../utils'

interface Chain {
  isETH: boolean
  isBSC: boolean
  isARBITRUM: boolean
  chain: string
  chainPath: string
}

// key is url path, value is chain name
const chainMap = {
  eth: 'eth',
  bsc: 'bsc',
  arbitrum: 'arbitrum'
}

type ChainMap = typeof chainMap
type ChainPath = keyof ChainMap

const CHAIN = {}

Object.defineProperties(CHAIN, {
  chainPath: {
    get() {
      const realPathnameArray = getRealPathnameArray()
      return realPathnameArray[1]
    }
  },
  chain: {
    get(): string {
      return chainMap[this.chainPath as ChainPath]
    }
  },
  isETH: {
    get() {
      return checkExplorer(ExplorerPath.ETH)
    }
  },
  isBSC: {
    get() {
      return checkExplorer(ExplorerPath.BSC)
    }
  },
  isARBITRUM: {
    get() {
      return checkExplorer(ExplorerPath.ARBITRUM)
    }
  }
})

export default CHAIN as Chain
