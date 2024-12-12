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
  },
  tab: {
    get() {
      const tab = getRealPathnameArray()[4]
      return tab
    }
  }
})

export default txPage as TX_PAGE
