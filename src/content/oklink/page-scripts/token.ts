import { getContractDeveloper } from '../feat-scripts'
import tokenPage from '../constant/tokenPage'

const initTokenPageScript = () => {
  requestIdleCallback(() => {
    if (tokenPage.tab === 'contract') {
      getContractDeveloper(tokenPage.address)
    }
  })
}

export default initTokenPageScript
