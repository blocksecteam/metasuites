import { getRealPathnameArray } from '../utils'

interface TX_PAGE {
  hash: string
}

const txPage = {}

Object.defineProperties(txPage, {
  hash: {
    get() {
      const hash = getRealPathnameArray()[3]
      return hash
    }
  }
})

export default txPage as TX_PAGE
