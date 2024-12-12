import { getRealPathnameArray } from '../utils'

interface ADDRESS_PAGE {
  address: string
  tab: string
}

const addressPage = {}

Object.defineProperties(addressPage, {
  address: {
    get() {
      const address = getRealPathnameArray()[3]
      return address
    }
  },
  tab: {
    get() {
      const tab = getRealPathnameArray()[4]
      return tab
    }
  }
})

export default addressPage as ADDRESS_PAGE
