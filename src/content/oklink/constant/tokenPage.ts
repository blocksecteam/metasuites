import { getHrefQueryVariable } from '@src/common/utils'
import { getRealPathnameArray } from '../utils'

interface TOKEN_PAGE {
  address: string
  tab: string
}

const tokenPage = {}

Object.defineProperties(tokenPage, {
  address: {
    get() {
      const address = getRealPathnameArray()[3]
      return address
    }
  },
  tab: {
    get() {
      const tab = getHrefQueryVariable(location.search, 'tab')
      return tab
    }
  }
})

export default tokenPage as TOKEN_PAGE
