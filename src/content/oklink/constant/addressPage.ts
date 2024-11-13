import { getRealPathnameArray } from '../utils'

interface ADDRESS_PAGE {
  address: string
}

const addressPage = {}

Object.defineProperties(addressPage, {
  address: {
    get() {
      const address = getRealPathnameArray()[3]
      return address
    }
  }
})

export default addressPage as ADDRESS_PAGE
