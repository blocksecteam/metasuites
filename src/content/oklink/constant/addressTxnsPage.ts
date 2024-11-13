import { getRealPathnameArray } from '../utils'

interface ADDRESS_TXNS_PAGE {
  address: string
}

const addressTxnsPage = {}

Object.defineProperties(addressTxnsPage, {
  address: {
    get() {
      const address = getRealPathnameArray()[3]
      return address
    }
  }
})

export default addressTxnsPage as ADDRESS_TXNS_PAGE
