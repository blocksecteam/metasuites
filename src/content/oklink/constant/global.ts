import CHAIN from './chain'
import { getRealPathnameArray } from '../utils'

interface OKLinkWindow extends Window {
  _okGlobal: {
    innerText: string
  }
}

interface Global {
  langPath: string
  prefixPath: string
  isAddress: boolean
  isAddressTxns: boolean
  isTx: boolean
  isToken: boolean
  prefixPathWithChain: string
}

const GLOBAL = {}

Object.defineProperties(GLOBAL, {
  globalConfig: {
    get() {
      try {
        return JSON.parse(
          (window as unknown as OKLinkWindow)._okGlobal.innerText
        )
      } catch (error) {
        return {}
      }
    }
  },
  langPath: {
    get() {
      return this.globalConfig?.langPath
    }
  },
  prefixPath: {
    get() {
      const { site } = this.globalConfig
      if (site?.is?.okex) {
        return `${this.langPath}/web3/explorer`
      }
      return this.langPath
    }
  },

  prefixPathWithChain: {
    get() {
      const { site } = this.globalConfig
      if (site?.is?.okex) {
        return `${this.langPath}/web3/explorer/${CHAIN.chainPath}`
      }
      return this.langPath + '/' + CHAIN.chainPath
    }
  },

  isAddress: {
    get() {
      const pageName = getRealPathnameArray()[2]
      return pageName === 'address'
    }
  },
  isAddressTxns: {
    get() {
      const pageName = getRealPathnameArray()[2]
      return pageName === 'address-txns'
    }
  },
  isTx: {
    get() {
      const pageName = getRealPathnameArray()[2]
      return pageName === 'tx'
    }
  },
  isToken: {
    get() {
      const pageName = getRealPathnameArray()[2]
      return pageName === 'token'
    }
  }
})

export default GLOBAL as Global
